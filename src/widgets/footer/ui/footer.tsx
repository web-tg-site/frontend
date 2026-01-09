import { LeftFooter } from "./left-footer"
import { RightFooter } from "./right-footer"

export const Footer = () => {
    return (
        <footer className="px-2.5 mb-2.5 grid lg:grid-cols-12 grid-cols-1 gap-2.5">
            <LeftFooter />

            <RightFooter />
        </footer>
    )
}