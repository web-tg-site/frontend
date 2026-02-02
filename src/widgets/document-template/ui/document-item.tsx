import { INDENT_PER_LEVEL } from "../config/indent_per_level";
import { DocumentNode } from "../types/document-template.props";
import { renderTextWithBold } from "../utils/render-text-with-bold";

export const DocumentItem = ({ node, depth = 0 }: { node: DocumentNode; depth?: number }) => {
    const paddingLeft = depth > 0 ? `calc(${INDENT_PER_LEVEL} * ${depth})` : undefined;
    const style = paddingLeft ? { paddingLeft } : {};

    const hasNumber = node.number.length > 0;
    const displayNumber = hasNumber
        ? (node.number.includes(".") ? node.number.split(".").pop() : node.number)
        : "";

    return (
        <div className="mb-3" style={{ paddingLeft: style.paddingLeft }}>
            {hasNumber && <span className="font-semibold text-[#1f2937]">{displayNumber}.</span>}
            {hasNumber && " "}
            <span className="text-[#374151]">{renderTextWithBold(node.text)}</span>
            {node.children?.length
                ? node.children.map((child, i) => (
                      <DocumentItem key={`${child.number}-${i}`} node={child} depth={depth + 1} />
                  ))
                : null}
        </div>
    );
};