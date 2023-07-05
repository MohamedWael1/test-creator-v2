import { cva, VariantProps } from "class-variance-authority";
import React, { forwardRef } from "react";

const inputStyles = cva(
    "rounded-sm border border-gray-300 shadow-sm focus:outline-indigo-600 font-semibold text-primary-text ",
    {
        variants: {
            size: {
                xs: "p-2 text-xs min-w-[50px]",
                sm: "p-2 text-sm min-w-[200px] ",
                md: "p-2 text-base min-w-[250px] ",
                lg: "p-2 text-lg  min-w-[350px]",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);

interface InputProps
    extends VariantProps<typeof inputStyles>,
        React.HtmlHTMLAttributes<HTMLInputElement> {
    className?: string;
    value?: string;
    type?: "text" | "number" | "password" | "email" | "tel" | "url";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const { size, type = "text", ...rest } = props;
        return (
            <>
                <input
                    type={type}
                    ref={ref}
                    className={inputStyles({ size, className })}
                    {...rest}
                    value={props.value}
                />
            </>
        );
    }
);

export default Input;
