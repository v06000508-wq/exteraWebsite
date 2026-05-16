import Link from "@/app/[locale]/_components/link";
import {useLocale, useTranslations} from "next-intl";
import LocaleToggle from "@/app/[locale]/(composited)/_components/locale-toggle";
import Button from "@/app/[locale]/_components/button";
import Marquee from "@/app/[locale]/_components/marquee";
import HeaderLink from "@/app/[locale]/(composited)/_components/header-link";
import HeaderMenu from "@/app/[locale]/(composited)/_components/header-menu";
import ThemeToggle from "@/app/[locale]/(composited)/_components/theme-toggle";

export default function Header() {
    const currentLocale = useLocale();
    const t = useTranslations("nav");

    return (
        <header
            className="relative flex justify-between items-center mb-16 font-display font-bold text-2xl sticky top-0 py-4 md:py-8
            bg-white dark:bg-black px-8 md:px-16 z-40 text-black dark:text-white border-b border-gray-100 dark:border-neutral-800 transition-colors duration-300"
        >
            <div className="flex items-center gap-4">
                <LocaleToggle currentLocale={currentLocale}/>
                <ThemeToggle />
            </div>
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