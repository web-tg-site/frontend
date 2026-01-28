import Image from "next/image";

export const SocialIcon = ({
    className='',
    social
}: {
    className?: string;
    social: 'telegram' | 'vk' | 'max'
}) => {
    return (
        <Image 
            width={24}
            height={24}
            src={`/socials/${social}.png`}
            alt={`${social} иконка`}
            className={className}
        />
    )
}