import IntlLink from "next/link";
import React, {ComponentProps, ReactNode} from "react";

export type LinkProps = {
    underline?: boolean;
    href: string;
    children: ReactNode;
    className?: string;
} & ComponentProps<typeof IntlLink>

const isAnchorOrExternal = (href: string) =>
    href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tg');

export default function Link(
    {
        underline,
        href,
        children,
        className,
        ...props
    }: LinkProps
) {
    const cls = underline ? (className || "") + " group" : className;
    const underlineEl = underline && (
        <div className="w-full scale-x-0 group-hover:scale-x-100 h-1 mt-1 rounded-full bg-amber-600 transition-transform duration-300 ease-in-out" />
    );

    if (isAnchorOrExternal(href)) {
        const {prefetch, replace, scroll, shallow, locale, ...aProps} = props as any;
        return (
            <a href={href} className={cls} {...aProps}>
                {children}
                {underlineEl}
            </a>
        );
    }

    return (
        <IntlLink href={href} className={cls} {...props}>
            {children}
            {underlineEl}
        </IntlLink>
    );
}