import { ComponentChildren } from "preact"

export const Description = ({ children }: { children: ComponentChildren }) => (
    <div className="description">
        {children}
    </div>
);