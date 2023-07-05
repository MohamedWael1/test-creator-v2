import { cva, VariantProps } from "class-variance-authority";
import Spinner from "../Spinner/Spinner";

const buttonStyles = cva(
    "rounded-md shadow-sm focus:outline-indigo-600 font-semibold transition-all capitalize",
    {
        variants: {
            intent: {
                primary:
                    "bg-primary-700 text-secondary-text hover:bg-primary-600",
                danger: "bg-danger-600 text-secondary-text hover:bg-danger-500",
                "primary-outline":
                    "bg-white text-primary-text border-2 border-gray-300 hover:bg-primary-600 hover:text-secondary-text hover:border-primary-600",
                "danger-outline":
                    "bg-white text-danger-600 border-2 border-danger-600 hover:bg-danger-500 hover:text-secondary-text hover:border-danger-500",
            },
            size: {
                sm: "p-1 text-sm min-w-[100px] h-[30px]",
                md: "py-2 px-1  text-md min-w-[200px] h-[40px]",
                lg: "px-1 py-2 text-lg min-w-[300px] h-[50px]",
            },
        },
        defaultVariants: {
            intent: "primary",
            size: "md",
        },
    }
);

interface ButtonProps
    extends VariantProps<typeof buttonStyles>,
        React.HtmlHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

function Button(props: ButtonProps) {
    const { className, intent, size, ...rest } = props;
    return (
        <button
            className={buttonStyles({ intent, size, className })}
            {...rest}
            disabled={props.disabled}
        >
            {props.isLoading ? <Spinner size="sm" /> : props.children}
        </button>
    );
}

export default Button;
