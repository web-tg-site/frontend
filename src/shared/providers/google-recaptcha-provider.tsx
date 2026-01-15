'use client'

import { GoogleReCaptchaProvider as ReCaptchaProvider } from "react-google-recaptcha-v3"

export const GoogleRecaptchaProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined
            }}
        >
            <style jsx global>{`
                .grecaptcha-badge {
                    visibility: hidden !important;
                }
            `}</style>

            {children}
        </ReCaptchaProvider>
    )
}