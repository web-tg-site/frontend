import Link from "next/link";
import { type ComponentProps } from "react";
import { type HTMLMotionProps } from "framer-motion";

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    loading?: boolean;
};

type ButtonMode = BaseProps & HTMLMotionProps<"button"> & {
    href?: never; 
};

type LinkMode = BaseProps & ComponentProps<typeof Link> & Omit<HTMLMotionProps<"a">, "href">;

export type LinkButtonProps = ButtonMode | LinkMode;