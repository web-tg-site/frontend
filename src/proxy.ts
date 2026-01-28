import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOGIN_ROUTE = '/admin/auth'

// Пути, закрытые для модераторов
const RESTRICTED_FOR_MODERATORS = [
    '/admin/category',
    '/admin/channels',
    '/admin/hero',
    '/admin/roles'
]

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('accessToken')?.value

    const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    
    const isLoginPage = normalizedPath === LOGIN_ROUTE
    const isAdminSection = normalizedPath.startsWith('/admin')

    // === СЦЕНАРИЙ 1: Пользователь с токеном на странице входа ===
    if (isLoginPage && token) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    // === СЦЕНАРИЙ 2: Защита админки ===
    if (isAdminSection && !isLoginPage) {
        
        if (!token) {
            return NextResponse.rewrite(new URL('/404', request.url))
        }

        try {
            const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'
            const cleanHost = apiHost.replace(/\/$/, '') 
            const url = `${cleanHost}/admin/profile`
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            })

            if (!response.ok) {
                throw new Error('Auth failed')
            }

            const profile = await response.json()

            // 1. Базовая проверка роли
            if (profile.type !== 'admin' && profile.type !== 'moderator') {
                return NextResponse.rewrite(new URL('/404', request.url))
            }

            // 2. ПРОВЕРКА МОДЕРАТОРА НА ЗАПРЕЩЕННЫЕ ПУТИ
            if (profile.type === 'moderator') {
                // Проверяем, начинается ли путь с запрещенного
                // Например, /admin/category/create начнется с /admin/category
                const isRestricted = RESTRICTED_FOR_MODERATORS.some(path => 
                    normalizedPath.startsWith(path)
                )

                if (isRestricted) {
                    return NextResponse.rewrite(new URL('/404', request.url))
                }
            }

            return NextResponse.next()

        } catch (error) {
            const response = NextResponse.rewrite(new URL('/404', request.url))
            response.cookies.delete('accessToken')
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin',
        '/admin/:path*'
    ],
}