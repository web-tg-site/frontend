"use client"

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

import { GoogleRecaptchaProvider } from "@/shared/providers"
import { AdminCard } from "@/shared/ui"
import { AdminButton } from "@/shared/ui/admin/ui/admin-button"
import { AdminInput } from "@/shared/ui/admin/ui/form/admin-input"
import { LoginFormData } from "../types/login-form-data"
import { sendAuth } from "../api/send-auth"
import { setAuthCookie } from "../actions/auth.actions"

const AdminAuthContent = () => {
    const { executeRecaptcha } = useGoogleReCaptcha()
    const router = useRouter()
    
    // ✅ Используем useState для серверных ошибок
    const [serverError, setServerError] = useState<string | null>(null)
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm<LoginFormData>()

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        
        // Очищаем предыдущую ошибку
        setServerError(null)

        try {
            if (!executeRecaptcha) {
                throw new Error("Защита не готова. Обновите страницу.")
            }

            const recaptchaToken = await executeRecaptcha("admin_login")

            if (!recaptchaToken) {
                throw new Error("Не удалось получить токен защиты")
            }
            const checkResponse = await fetch('/api/check-captcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: recaptchaToken })
            })

            if (!checkResponse.ok) {
                throw new Error("Проверка безопасности не пройдена")
            }
            const response = await sendAuth(data)
            
            // Проверяем токен
            if (!response?.access_token) {
                throw new Error("Токен не получен от сервера")
            }
            const cookieResult = await setAuthCookie(response.access_token)

            if (cookieResult?.success) {
                router.push("/admin")
            } else {
                throw new Error(cookieResult?.error || "Ошибка сохранения сессии")
            }

        } catch (error) {

            let errorMessage = "Произошла неизвестная ошибка"

            if (error instanceof AxiosError) {
                console.log("Axios ошибка, статус:", error.response?.status)
                console.log("Axios ошибка, данные:", error.response?.data)
                
                const backendMessage = error.response?.data?.message

                if (Array.isArray(backendMessage)) {
                    errorMessage = backendMessage[0]
                } else if (typeof backendMessage === 'string') {
                    errorMessage = backendMessage
                } else {
                    errorMessage = "Ошибка сервера. Попробуйте позже."
                }
            } else if (error instanceof Error) {
                errorMessage = error.message
            }

            // ✅ Устанавливаем ошибку через useState
            setServerError(errorMessage)
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <AdminCard className="p-7.5 min-w-[500px]">
                {/* ✅ Явный preventDefault */}
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit(onSubmit)(e)
                    }}
                >
                    <p className="text-white text-center text-[20px] mb-7">
                        Войти в систему
                    </p>

                    {/* ✅ Отображаем ошибку из useState */}
                    {serverError && (
                        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-xl text-red-200 text-sm text-center">
                            {serverError}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-3 mb-5">
                        <AdminInput
                            placeholder="Email"
                            error={errors.email?.message}
                            disabled={isSubmitting}
                            {...register("email", { 
                                required: "Введите Email",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Некорректный формат Email"
                                }
                            })}
                        />

                        <AdminInput 
                            type="password"
                            placeholder="Пароль"
                            error={errors.password?.message}
                            disabled={isSubmitting}
                            {...register("password", { required: "Введите пароль" })}
                        />
                    </div>

                    <AdminButton 
                        type="submit" 
                        className="w-full text-center mb-4"
                        loading={isSubmitting}
                    >
                        Войти
                    </AdminButton>

                    <p className="text-[10px] text-white/20 text-center leading-tight">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a 
                            href="https://policies.google.com/privacy" 
                            className="hover:text-white/40 transition-colors" 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            Privacy Policy
                        </a> and{' '}
                        <a 
                            href="https://policies.google.com/terms" 
                            className="hover:text-white/40 transition-colors" 
                            target="_blank" 
                            rel="noreferrer"
                        >
                            Terms of Service
                        </a> apply.
                    </p>
                </form>
            </AdminCard>
        </div>
    )
}

export const AdminAuth = () => {
    return (
        <GoogleRecaptchaProvider>
            <AdminAuthContent />
        </GoogleRecaptchaProvider>
    )
}