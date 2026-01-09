'use client'

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

import { SendApplicationFormProps } from "../types/send-application-form.props"
import { SendApplicationFormData } from "../types/send-application-form-data"
import { SendApplication } from "../api/send-application"

import { cn } from "@/shared/utils"
import { Text, Title } from "@/shared/ui/text"
import { Checkbox, Input } from "@/shared/ui/form"
import { LinkButton } from "@/shared/ui/link-button"
import { variants } from "../config/animation-variants"


export const SendApplicationForm = ({ className = "" }: SendApplicationFormProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<SendApplicationFormData>({
        defaultValues: {
            name: "",
            phone: "",
            telegram: "",
            comment: "",
            isAgreed: false,
        }
    })

    const onSubmit = async (data: SendApplicationFormData) => {
        setIsLoading(true)

        const { isAgreed, ...payload } = data

        try {
            await SendApplication({
                ...payload,
                comment: payload.comment || ""
            })

            setIsSuccess(true)
            reset()

            setTimeout(() => setIsSuccess(false), 5000)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn("lg:px-8 px-4 bg-[#6155F5] rounded-2xl overflow-hidden relative", className)}>
            <AnimatePresence mode="wait" initial={false}>
                {isSuccess ? (
                    <motion.div
                        key="success"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="h-full min-h-[400px] flex items-center justify-center py-10"
                    >
                        <div className="text-center">
                            <Title variant="h3" className="text-white mb-2">
                                Заявка отправлена!
                            </Title>
                            <Text className="text-white/80">
                                Мы свяжемся с вами в ближайшее время.
                            </Text>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:py-8 py-4"
                    >
                        <Text className="lg:mb-[86px] mb-6">
                            Оставьте заявку и мы вышлем вам персональную ссылку для вашей компании с подборкой каналов под ваши цели
                        </Text>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                            <div className="grid grid-cols-1 gap-2.5 mb-6">
                                <Input
                                    placeholder="Имя"
                                    {...register("name")}
                                    disabled={isLoading}
                                />

                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{
                                        required: "Введите номер телефона",
                                        minLength: { value: 8, message: "Короткий номер" }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Телефон *"
                                            type="tel"
                                            error={errors.phone?.message}
                                            disabled={isLoading}
                                            onFocus={() => {
                                                if (!field.value) field.onChange("+")
                                                field.onBlur()
                                            }}
                                            onBlur={() => {
                                                if (field.value === "+") field.onChange("")
                                                field.onBlur()
                                            }}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/[^0-9+\s\-()]/g, "")
                                                if (val === "") {
                                                    field.onChange("")
                                                    return
                                                }
                                                if (!val.startsWith("+")) {
                                                    val = "+" + val.replace(/\+/g, "")
                                                }
                                                field.onChange(val)
                                            }}
                                        />
                                    )}
                                />

                                <Controller
                                    name="telegram"
                                    control={control}
                                    rules={{
                                        required: "Укажите Telegram",
                                        minLength: { value: 6, message: "Минимум 5 символов" }
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Telegram *"
                                            error={errors.telegram?.message}
                                            disabled={isLoading}
                                            onFocus={() => {
                                                if (!field.value) field.onChange("@")
                                                field.onBlur()
                                            }}
                                            onBlur={() => {
                                                if (field.value === "@") field.onChange("")
                                                field.onBlur()
                                            }}
                                            onChange={(e) => {
                                                let val = e.target.value
                                                if (val === "") {
                                                    field.onChange("")
                                                    return
                                                }
                                                if (!val.startsWith("@")) {
                                                    val = "@" + val.replace(/@/g, "")
                                                }
                                                field.onChange(val)
                                            }}
                                        />
                                    )}
                                />

                                <Input
                                    placeholder="Комментарий"
                                    {...register("comment")}
                                    disabled={isLoading}
                                />
                            </div>

                            <Checkbox
                                className="mb-10"
                                error={errors.isAgreed?.message}
                                {...register("isAgreed", {
                                    required: "Необходимо согласие на обработку данных",
                                })}
                            >
                                Я ознакомился и согласен с{" "}
                                <Link
                                    href="/policy"
                                    className="transition hover:underline underline-offset-4"
                                >
                                    Политикой конфиденциальности сайта
                                </Link>
                            </Checkbox>

                            <LinkButton
                                type="submit"
                                loading={isLoading}
                                disabled={isLoading}
                                animate="initial"
                                className="w-full h-[50px] text-[20px]"
                            >
                                Заказать подборку
                            </LinkButton>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}