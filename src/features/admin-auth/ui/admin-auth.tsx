"use client"

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
    
    const { 
        register, 
        handleSubmit, 
        setError,
        clearErrors,
        formState: { errors, isSubmitting } 
    } = useForm<LoginFormData>()

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        clearErrors("root")

        try {
            if (!executeRecaptcha) {
                throw new Error("Защита не готова. Обновите страницу.")
            }

            const token = await executeRecaptcha("admin_login")

            if (!token) {
                throw new Error("Не удалось получить токен защиты")
            }

            const checkResponse = await fetch('/api/check-captcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            })

            if (!checkResponse.ok) {
                throw new Error("Проверка безопасности не пройдена")
            }

            const response = await sendAuth(data)
            
            // ИСПРАВЛЕНО: используем access_token (как на скриншоте)
            if (response?.access_token) {
                await setAuthCookie(response.access_token)
            } else {
                console.error("Ответ сервера:", response) // Логируем, если что-то пойдет не так
                throw new Error("Токен не получен от сервера")
            }

        } catch (error) {
            console.error(error)

            if (error instanceof AxiosError) {
                const backendMessage = error.response?.data?.message

                const textMessage = Array.isArray(backendMessage)
                    ? backendMessage[0] 
                    : backendMessage

                setError("root", { 
                    message: textMessage || "Ошибка сервера. Попробуйте позже." 
                })
            } else if (error instanceof Error) {
                setError("root", { message: error.message })
            } else {
                setError("root", { message: "Произошла неизвестная ошибка" })
            }
        }
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <AdminCard className="p-7.5 min-w-[500px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-white text-center text-[20px] mb-7">Войти в систему</p>

                    {errors.root?.message && (
                        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-xl text-red-200 text-sm text-center">
                            {errors.root.message}
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
                        <a href="https://policies.google.com/privacy" className="hover:text-white/40 transition-colors" target="_blank" rel="noreferrer">Privacy Policy</a> and{' '}
                        <a href="https://policies.google.com/terms" className="hover:text-white/40 transition-colors" target="_blank" rel="noreferrer">Terms of Service</a> apply.
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