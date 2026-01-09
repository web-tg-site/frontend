import { SVGProps } from "react"

export const CheckMark = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
    return (
        <svg 
            className={className}
            width="14" 
            height="13" 
            viewBox="0 0 14 13" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path 
                d="M0.5 5.5L6.5 11.5L13.5 0.5" 
                stroke="currentColor" 
                strokeLinecap="round"
            />
        </svg>
    )
}