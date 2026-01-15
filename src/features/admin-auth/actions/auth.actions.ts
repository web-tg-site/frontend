'use server'

import { cookies } from 'next/headers'

export async function setAuthCookie(token: string) {
    const cookieStore = await cookies()
    
    cookieStore.set('accessToken', token, {
        httpOnly: true, // Важно: JS на клиенте не увидит куку, но Middleware увидит
        secure: process.env.NODE_ENV === 'production', // HTTPS только на проде
        path: '/', // Доступна на всех страницах
        maxAge: 60 * 60 * 24 * 7, // 7 дней
        sameSite: 'lax'
    })
}