'use client'

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Text, Title } from "@/shared/ui/text"
import { SendApplicationFormProps } from "../types/send-application-form.props"
import { SendApplicationFormData } from "../types/send-application-form-data"
import { SendApplication } from "../api/send-application"
import { cn } from "@/shared/utils"
import { Input, LinkButton } from "@/shared/ui"

export const SendApplicationForm = ({
    className = ""
}: SendApplicationFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
            comment: ""
        }
    });

    const onSubmit = async (data: SendApplicationFormData) => {
        setIsLoading(true);
        try {
            await SendApplication({
                ...data,
                comment: data.comment || ""
            });
            
            setIsSuccess(true);
            reset();
            
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const variants = {
        hidden: { opacity: 0, y: 10, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.98 }
    };

    return (
        <div className={cn("px-8 bg-[#6155F5] rounded-2xl overflow-hidden relative", className)}>
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
                        className="py-8"
                    >
                        <Text className="mb-[86px]">
                            Оставьте заявку и мы вышлем вам персональную ссылку для вашей компании с подборкой каналов под ваши цели
                        </Text>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                                            onFocus={(e) => {
                                                if (!field.value) field.onChange("+");
                                                field.onBlur();
                                            }}
                                            onBlur={(e) => {
                                                if (field.value === "+") field.onChange("");
                                                field.onBlur();
                                            }}
                                            onChange={(e) => {
                                                let val = e.target.value.replace(/[^0-9+\s\-()]/g, "");
                                                if (val === "") {
                                                    field.onChange("");
                                                    return;
                                                }
                                                if (!val.startsWith("+")) {
                                                    val = "+" + val.replace(/\+/g, "");
                                                }
                                                field.onChange(val);
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
                                            onFocus={(e) => {
                                                if (!field.value) field.onChange("@");
                                                field.onBlur();
                                            }}
                                            onBlur={(e) => {
                                                if (field.value === "@") field.onChange("");
                                                field.onBlur();
                                            }}
                                            onChange={(e) => {
                                                let val = e.target.value;
                                                if (val === "") {
                                                    field.onChange("");
                                                    return;
                                                }
                                                if (!val.startsWith("@")) {
                                                    val = "@" + val.replace(/@/g, "");
                                                }
                                                field.onChange(val);
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

                            {/* 👇 ИСПРАВЛЕНИЕ ЗДЕСЬ 👇 */}
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