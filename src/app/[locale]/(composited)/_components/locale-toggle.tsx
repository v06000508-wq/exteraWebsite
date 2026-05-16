"use client";

import Link from "@/app/[locale]/_components/link";
import {usePathname} from "next/navigation";
import {localeConfig} from "@/localeConfig";
import {Fragment} from "react";

export default function LocaleToggle({currentLocale}: {currentLocale: string}) {
    const fullPath = usePathname() || "/";
    const pathWithoutLocale = fullPath.replace(new RegExp(`^/(${localeConfig.locales.join("|")})`), "") || "/";

    return (
        <div className="flex gap-16">
            <div className="flex items-center gap-4">
                <span className="text-xs font-bold tracking-widest text-white dark:text-black bg-black dark:bg-white px-2 py-1 rounded-full">BETA</span>
                {localeConfig.locales.map((locale, i) => {
                    const localePath = `/${locale}${pathWithoutLocale}`;
                    return (
                        <Fragment key={locale}>
                            <Link
                                href={localePath}
                                className={"uppercase" +
                                    (locale === currentLocale ? " underline decoration-4 underline-offset-8 text-black dark:text-white"
                                        : " text-neutral-500 hover:text-black dark:hover:text-white"
                                    )}
                                data-cursor-text={locale.toUpperCase()}
                            >
                                {locale}
                            </Link>
                            {i < localeConfig.locales.length - 1 &&
                                <div className="bg-gray-200 dark:bg-neutral-800 rounded h-8 w-1"/>
                            }
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}