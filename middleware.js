import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname !== '/') return NextResponse.next();

  const languages = request.headers.get('accept-language')?.toLowerCase() ?? '';
  const locale = languages.includes('pt-br') || languages.startsWith('pt') ? 'pt-BR' : 'en';
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: ['/'],
};
