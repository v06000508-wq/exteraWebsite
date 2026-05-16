import {PropsWithChildren} from "react";

export type ButtonProps = PropsWithChildren<{
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}>;

export default function Button({className, children, onClick, disabled}: ButtonProps) {
    return (
        <button
            className={`rounded-full font-display font-bold text-2xl text-white hover:text-white py-4 px-8
                hover:bg-gray-900 bg-black active:bg-gray-800 duration-300 ease-in-out transition-all
                active:text-white disabled:opacity-50 disabled:pointer-events-none hover:scale-105 active:scale-95
                ${className || ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}