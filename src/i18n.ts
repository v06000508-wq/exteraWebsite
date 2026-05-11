import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
    const locale = await requestLocale;
    const localeFile = await import(`./data/locales/${locale}.json`);
    const messages = localeFile.default || {};

    return {
        locale,
        messages
    }
});