import createMiddleware from 'next-intl/middleware';
import {localeConfig} from "@/localeConfig";

export default createMiddleware(localeConfig);

export const config = {
    matcher: ['/((?!api|_next|favicon.ico|images).*)']
};