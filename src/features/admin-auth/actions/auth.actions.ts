'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation' // Импортируем redirect

export async function setAuthCookie(token: string) {
    console.log('[LOGS][RESPONSE TOKEN]:', token);
    const cookieStore = await cookies();

    const isProduction = process.env.NODE_ENV === 'production';
    
    // Проверка на всякий случай
    if (!token) {
        console.error("Попытка записать пустой токен!")
        return { success: false, error: "Token is empty" }
    }
    
    cookieStore.set('accessToken', token, {
        httpOnly: true,
        secure: isProduction,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax'
    })

    redirect('/admin')
}