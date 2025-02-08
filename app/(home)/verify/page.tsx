// app/verify/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"

export default function VerifyEmail({ searchParams }: { searchParams: { [key: string]: string } }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        if (searchParams.code) {
            verifyEmail(searchParams.code) // URL parametresindeki code'yu kullanıyoruz
        }
    }, [searchParams])

    const verifyEmail = async (code: string) => {
        setLoading(true)

        try {
            const supabase = createClient('your-supabase-url', 'your-supabase-key')

            // Supabase OTP doğrulaması
            const { data, error } = await supabase.auth.verifyOtp({
                email: '', // E-postayı almanız gerekecek. Supabase'de e-posta doğrulama işlemi gerektirdiği için bunun doğru şekilde sağlanması gerekebilir.
                token: code, // URL'den alınan "code" parametresini kullanıyoruz
                type: 'signup',
            })

            if (error) {
                setError('Verification failed. Please try again.')
                setLoading(false)
                return
            }

            // Başarılı doğrulama sonrası kullanıcıyı kaydedebilirsiniz
            if (data) {
                const user = data.user
                // saveUser fonksiyonunu burada çağırmayacağız
                // saveUser(user.id, user.email) işlemini başka bir yerde yapabilirsiniz
                router.push('/login') // Giriş sayfasına yönlendir
            }

        } catch (error) {
            setError('An error occurred during verification')
        }

        setLoading(false)
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <h1>Email Verified Successfully!</h1>
            <Button onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
    )
}
