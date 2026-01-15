import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOGIN_ROUTE = '/admin/auth'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('accessToken')?.value

    console.log(`[MW] Path: ${pathname} | Token: ${token ? 'YES' : 'NO'}`)

    // Приводим путь к единому виду (убираем слэш в конце, если есть, чтобы /admin/auth/ совпадало с /admin/auth)
    const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    
    const isLoginPage = normalizedPath === LOGIN_ROUTE
    // Проверяем, что это админка (на всякий случай, хотя matcher уже отфильтровал)
    const isAdminSection = normalizedPath.startsWith('/admin')

    // === СЦЕНАРИЙ 1: Пользователь с токеном пытается зайти на страницу входа ===
    if (isLoginPage && token) {
        console.log('[MW] User authorized -> Redirecting to /admin')
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    // === СЦЕНАРИЙ 2: Защита остальных страниц админки ===
    if (isAdminSection && !isLoginPage) {
        
        // Если нет токена — отдаем 404
        if (!token) {
            console.log('[MW] No token -> Rewrite 404')
            return NextResponse.rewrite(new URL('/404', request.url))
        }

        try {
            const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'
            const cleanHost = apiHost.replace(/\/$/, '') 
            const url = `${cleanHost}/api/admin/profile`
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            })

            if (!response.ok) {
                console.log('[MW] API check failed')
                throw new Error('Auth failed')
            }

            const profile = await response.json()

            if (profile.type !== 'admin' && profile.type !== 'moderator') {
                console.log('[MW] Bad role -> Rewrite 404')
                return NextResponse.rewrite(new URL('/404', request.url))
            }

            return NextResponse.next()

        } catch (error) {
            console.error('[MW] Error:', error)
            const response = NextResponse.rewrite(new URL('/404', request.url))
            response.cookies.delete('accessToken')
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    // ИСПРАВЛЕНО: Добавляем '/admin' отдельно, чтобы ловить корень
    matcher: [
        '/admin',           // Ловит ровно /admin
        '/admin/:path*'     // Ловит /admin/auth, /admin/users и т.д.
    ],
}