import { useTranslations } from "next-intl";
import Link from "@/app/[locale]/_components/link";
import IconCanvas from "@/app/[locale]/_components/icon-canvas";
import Image from "next/image";
import DragSlider from "@/app/[locale]/_components/drag-slider";
import DownloadButton from "@/app/[locale]/(composited)/(home)/_components/download-button";
import TeamMember from "@/app/[locale]/(composited)/(home)/_components/team-member";
import FeaturesOverview from "@/app/[locale]/(composited)/(home)/_components/features-overview";
import Phone from "@/app/[locale]/(composited)/(home)/_components/phone";
import Phone3D from "@/app/[locale]/(composited)/(home)/_components/phone-3d";
import { checkedIcons } from "@/loaders/icons";
import Button from "@/app/[locale]/_components/button";
import Marquee from "@/app/[locale]/_components/marquee";
import { default as phone } from "@/data/phone.json";
import { default as features } from "@/data/features.json";
import { default as moreFeatures } from "@/data/more.json";
import { default as splashes } from "@/data/splashes.json";
import { default as team } from "@/data/team.json";
import { default as downloads } from "@/data/downloads.json";
import { localisePath } from "@/loaders/path";
import { unsafelyLoadSVG } from "@/loaders/svg";
import { SquareArrowDown } from "solar-icon-set";
import * as icons from "solar-icon-set";
import { ComponentType } from "react";
import { IconProps } from "solar-icon-set/dist/types";
import Anchor from "@/app/[locale]/(composited)/_components/anchor";
import GlitchTitle from "@/app/[locale]/(composited)/(home)/_components/glitch-title";
import GlitchText from "@/app/[locale]/(composited)/(home)/_components/glitch-text";
import SpotlightSection from "@/app/[locale]/(composited)/(home)/_components/spotlight-section";
import HoverImage from "@/app/[locale]/(composited)/(home)/_components/hover-image";

export default function Home() {
    const t = useTranslations('home');

    return (
        <>
            <IconCanvas probability={0.02} paths={checkedIcons} height={2000} />

            <section className="w-full flex justify-center items-center flex-col gap-4 mt-48 md:mt-72 mb-16 px-4" id="top">
                <h1 className="text-primary-500 font-bold font-display text-5xl md:text-6xl lg:text-7xl">
                    <GlitchTitle>{t("title")}</GlitchTitle>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-200 w-full md:w-[30rem] text-center">
                    <GlitchText>{t("description")}</GlitchText>
                </p>
                <Link
                    href="/#download"
                    className="md:hidden"
                >
                    <Button>
                        {t('more.download')}
                    </Button>
                </Link>
                <Phone3D textureUrl="/images/phone/custom_screen.jpg" />
            </section>
            <Anchor id="features" className="top-12 lg:-top-48" />
            <SpotlightSection
                className="bg-black text-white justify-between flex lg:px-24 lg:py-36 lg:gap-4 mb-16 flex-col w-full-no-offset
                lg:flex-row rounded-4xl lg:rounded-6xl lg:h-[28rem] mt-64 sm:p-12 sm:pt-16 gap-12 p-4 pt-12 mx-offset md:o-16"
            >
                <div className="flex flex-col gap-4 justify-center">
                    <h3 className="font-bold font-display text-5xl lg:text-6xl 2xl:text-8xl text-center lg:text-left">
                        {t("features.title")}
                    </h3>
                    <p className="text-lg md:text-xl xl:text-2xl w-full lg:max-w-lg text-center lg:text-left">
                        {t("features.description")}
                    </p>
                </div>

                <FeaturesOverview
                    features={[
                        ...features.map(({ id, img }) => ({
                            name: t("features." + id),
                            content: (
                                <div className="flex items-end justify-center w-full h-full">
                                    <Image
                                        src={localisePath(img.src)}
                                        width={img.width} height={img.height} alt={t("features." + id)}
                                        className="object-contain max-h-full"
                                    />
                                </div>
                            )
                        })),
                        {
                            name: t("features.more"),
                            content: (
                                <div className="flex flex-col items-center gap-8 justify-center w-full h-full">
                                    <Link
                                        href="/#more"
                                        role="button"
                                        className="w-32 h-32 aspect-square hover:bg-gray-800 flex-col hover:text-white
                                        rounded-full bg-white text-black flex justify-center items-center transition-colors
                                        active:bg-black active:text-white duration-300 ease-in-out"
                                    >
                                        <SquareArrowDown size={60} iconStyle="Bold" />
                                    </Link>
                                    <p className="text-neutral-500 text-xl font-medium">{t("features.button")}</p>
                                </div>
                            )
                        },
                    ]}
                    className="lg:w-[32rem] h-fit lg:-translate-y-96 rounded-3xl bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white shadow-xl"
                    leftOffset={24}
                />
            </SpotlightSection>

            <Anchor id="more" />
            <section
                className="flex justify-center items-center flex-col gap-24 mb-16 border-2 py-12 px-4 md:px-12 lg:p-20
                border-neutral-100 dark:border-neutral-800 rounded-4xl md:rounded-6xl bg-white dark:bg-black md:o-16 o-4 mx-offset w-full-no-offset"
            >
                {moreFeatures.map(({ img, id, note, icon }, i) => {
                    const Icon: ComponentType<IconProps> = icon.startsWith('@') && icons.hasOwnProperty(icon.slice(1)) ?
                        (icons as any)[icon.slice(1)] : () => unsafelyLoadSVG(localisePath(icon))
                    return (
                        <figure
                            className={"flex w-full justify-between gap-8 md:gap-24 items-center flex-col-reverse " +
                                (i % 2 ? 'md:flex-row-reverse' : 'md:flex-row')}
                            key={i}
                        >
                            <HoverImage
                                src={localisePath(img.src)}
                                alt={t("more." + id + ".alt")}
                                width={img.width}
                                height={img.height}
                                quality={100}
                                className="w-full h-auto"
                                containerClassName="w-full md:w-5/12 rounded-2xl"
                            />
                            <figcaption
                                className="flex flex-col justify-center gap-1 text-center md:text-left md:w-7/12 h-fit">
                                {Icon && (
                                    <div
                                        className="flex justify-center p-4 rounded-full bg-black dark:bg-white text-white dark:text-black w-min
                                        h-min items-center mx-auto md:mx-0 mb-4"
                                    >
                                        <Icon iconStyle="Bold" size={40} />
                                    </div>
                                )}
                                {note &&
                                    <p className="text-neutral-400 text-lg">
                                        {t("more." + id + ".note")}
                                    </p>
                                }
                                <h3 className="font-bold font-display text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
                                    {t("more." + id + ".title")}
                                </h3>
                                <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl xl:text-2xl mt-4 md:mt-6">
                                    {t("more." + id + ".description")}
                                </p>
                            </figcaption>
                        </figure>
                    )
                })}
                <figure className="flex flex-col gap-4 lg:gap-6 items-center">
                    <h3 className="font-bold font-display text-4xl lg:text-7xl text-center">
                        {t("more.title")}
                    </h3>
                    <p className="text-lg md:text-xl xl:text-2xl text-neutral-800 dark:text-neutral-200 w-full max-w-lg text-center">
                        {t("more.description")}
                    </p>
                    <Link
                        href="/#download"
                    >
                        <Button>
                            {t('more.download')}
                        </Button>
                    </Link>
                </figure>
            </section>

            <div
                className="overflow-hidden w-full my-8 md:my-16 flex flex-col justify-center h-96 sm:h-[32rem] md:h-[48rem]
                word-spacing-6 text-6xl sm:text-8xl md:text-9xl font-bold font-display"
            >
                <Marquee rotation={8} className="text-neutral-300 dark:text-neutral-700" scrollBoost={0.25}>
                    {"Приватный Быстрый Свободный Мощный Твой Настраиваемый"}
                </Marquee>
                <div className="h-4 md:h-12" />
                <Marquee rotation={8} baseVelocity={-1} className="text-white dark:text-black text-outline-neutral-300 dark:text-outline-neutral-500" scrollBoost={0.25}>
                    {splashes.join(" ")}
                </Marquee>
            </div>

            <Anchor id="team" />
            <section className="w-full flex justify-center items-center flex-col gap-16 mb-32">
                <h2 className="font-display font-bold text-5xl lg:text-7xl text-center">{t("team.title")}</h2>
                <DragSlider>
                    {
                        team.map(({ img, roles, ...member }, i) => (
                            <TeamMember
                                key={i}
                                buttonText={t("team.contact")}
                                img={localisePath(img)}
                                role={roles.map(role => t(`team.roles.${role}`)).join(', ')}
                                {...member}
                            />
                        ))
                    }
                </DragSlider>
            </section>

            <Anchor id="download" className="md:-top-48" />
            <section className="w-full flex justify-center items-center flex-col px-5 md:px-8 gap-8 md:gap-16">
                <h2 className="font-display font-bold text-5xl lg:text-7xl text-center">{t("download.title")}</h2>
                <div className="flex flex-row flex-wrap gap-8 justify-center w-full">
                    {
                        downloads.map(({ name, icon, eyebrowId, unavailable, href }, i) => (
                            <DownloadButton
                                key={i}
                                name={name}
                                icon={unsafelyLoadSVG(localisePath(icon))}
                                eyebrow={t("download." + eyebrowId)}
                                {...(unavailable ? { disabled: true } : { href })}
                            />
                        ))
                    }
                </div>
            </section>
        </>
    )
}
