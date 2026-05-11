import createIntlMiddleware from 'next-intl/middleware';
import {localeConfig} from "@/localeConfig";

export default createIntlMiddleware(localeConfig);

export const config = {
    matcher: ['/((?!api|_next|favicon.ico|images).*)']
};