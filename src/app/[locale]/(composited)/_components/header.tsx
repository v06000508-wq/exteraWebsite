import Link from "@/app/[locale]/_components/link";
import {useLocale, useTranslations} from "next-intl";
import LocaleToggle from "@/app/[locale]/(composited)/_components/locale-toggle";
import Button from "@/app/[locale]/_components/button";
import Marquee from "@/app/[locale]/_components/marquee";
import HeaderLink from "@/app/[locale]/(composited)/_components/header-link";
import HeaderMenu from "@/app/[locale]/(composited)/_components/header-menu";

export default function Header() {
    const currentLocale = useLocale();
    const t = useTranslations("nav");

    return (
        <header
            className="relative flex justify-between items-center mb-16 font-display font-bold text-2xl sticky top-0 py-4 md:py-8
            bg-[url('/images/header-mobile.png')] md:bg-[url('/images/header-pc.png')] bg-cover bg-center bg-no-repeat px-8 md:px-16 z-40 text-amber-800
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-amber-50/50 before:to-amber-100/90 before:pointer-events-none"
        >
            <LocaleToggle currentLocale={currentLocale}/>
            <HeaderMenu>
                <HeaderLink
                    href="/#team"
                    data-cursor-text={t('team')}
                >
                    {t('team')}
                </HeaderLink>
                <HeaderLink
                    href="/#features"
                    data-cursor-text={t('features')}
                >
                    {t('features')}
                </HeaderLink>
                <Link
                    href="/#download"
                    className="hidden md:block"
                >
                    <Button className="w-14 overflow-hidden md:w-48 word-spacing-6 px-[0!important]">
                        <Marquee repeatCount={2}>
                            {t('download')}
                        </Marquee>
                    </Button>
                </Link>
                <HeaderLink href="/legal/privacy" mobile>
                    {t('privacy')}
                </HeaderLink>
            </HeaderMenu>
        </header>
    )
}