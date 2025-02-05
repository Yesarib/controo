import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
    const response = await updateSession(request);

    const token = request.cookies.get('sb-lfasbkgwbiippxtxyady-auth-token-code-verifier')?.value || request.cookies.get('sb-lfasbkgwbiippxtxyady-auth-token')?.value;
    
    if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return response; 
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
