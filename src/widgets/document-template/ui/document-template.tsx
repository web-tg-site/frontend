import { WhiteBlockTemplate } from "@/widgets/personal-selection/ui/white-block-template";
import { DocumentTemplateProps } from "../types/document-template.props";
import { Headline } from "@/shared/ui";
import { DocumentItem } from "./document-item";

export const DocumentTemplate = ({
    title,
    items,
    className = "",
}: DocumentTemplateProps) => {
    return (
        <div className="min-h-screen pt-[72px] pb-4 md:pt-24 md:pb-16 overflow-x-hidden">
            <Headline variant="h2" className="px-5 mb-[53px]">
                {title}
            </Headline>
            <WhiteBlockTemplate className={className}>
                <div className="space-y-3 text-[15px] leading-relaxed md:text-base text-[#374151] wrap-break-word [&_strong]:font-semibold [&_strong]:text-[#111827]">
                    {items.map((item, i) => (
                        <DocumentItem key={`${item.number}-${i}`} node={item} depth={0} />
                    ))}
                </div>
            </WhiteBlockTemplate>
        </div>
    );
};
