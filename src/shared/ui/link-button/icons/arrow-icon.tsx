import type { SVGProps } from 'react';

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path 
            d="M0.852051 14.8521L14.8521 0.852051M14.8521 0.852051V10.8521M14.8521 0.852051H3.85205" 
            stroke="currentColor"
            strokeWidth="1.7041" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </svg>
)