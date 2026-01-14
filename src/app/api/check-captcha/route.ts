import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { token } = await request.json()

        if (!token) {
            return NextResponse.json({ message: 'Token not found' }, { status: 400 })
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY

        const googleResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `secret=${secretKey}&response=${token}`,
        })

        const googleData = await googleResponse.json()

        if (!googleData.success || googleData.score < 0.5) {
            console.error('Captcha check failed:', googleData)
            return NextResponse.json({ success: false, message: 'Bot detected' }, { status: 400 })
        }

        return NextResponse.json({ success: true })

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}