import Link from "@/app/[locale]/_components/link";
import Image from "next/image";

export type TeamMemberProps = {
    href: string;
    name: string;
    role: string;
    img?: string;
    buttonText: string;
}

export default function TeamMember({href, name, role, img, buttonText}: TeamMemberProps) {
    return (
        <figure
            className="group border-2 border-neutral-300 dark:border-neutral-800 rounded-4xl p-4 md:p-8 flex flex-col justify-center duration-300 ease-in-out
            items-center w-72 md:w-96 h-96 md:h-[32rem] hover:border-black dark:hover:border-white overflow-hidden transition-colors relative"
        >
            <Image
                src="/images/team/background.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover -z-10 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-30 duration-300 ease-in-out"
                width={760}
                height={1014}
                quality={100}
            />
            <div className="w-full flex-1" />
            {img && <Image src={img} alt={name} className="rounded-full aspect-square mb-6 w-24 md:w-36" width={150} height={150} />}
            <h6 className="font-display font-bold text-2xl md:text-3xl">{name}</h6>
            <p className="text-xl md:text-2xl text-center">{role}</p>
            <div className="w-full flex-1" />
            {href && (
                <Link
                    className="can-hover:translate-y-28 group-hover:translate-y-0 transition-transform w-full py-4 md:py-6 text-xl
                    bg-black dark:bg-white text-white dark:text-black rounded-xl active:bg-gray-900 dark:active:bg-gray-200 flex justify-center
                    items-center duration-300 ease-in-out"
                    href={href}
                    target="_blank"
                    data-drag-slider-ignore
                >
                    {buttonText}
                </Link>
            )}
        </figure>
    )
}