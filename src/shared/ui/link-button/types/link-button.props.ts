import Link from "next/link";
import { type ComponentProps } from "react";

type BaseProps = {
    children: React.ReactNode;
    className?: string;
    loading?: boolean;
};

type ButtonMode = BaseProps & ComponentProps<"button"> & {
    href?: never; 
};

type LinkMode = BaseProps & ComponentProps<typeof Link>;

export type LinkButtonProps = ButtonMode | LinkMode;