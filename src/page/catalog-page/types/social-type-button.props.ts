import { SocialType } from "./social-type";

export interface SocialTypeButtonProps extends SocialType {
    isSelected: boolean;
    onClick: (type: string) => void;
}