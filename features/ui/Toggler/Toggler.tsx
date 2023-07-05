import clsx from "clsx";
import { motion } from "framer-motion";

interface TogglerProps {
    isActive: boolean;
    onToggle?: () => void;
}

function Toggler(props: TogglerProps) {
    return (
        <div
            onClick={props.onToggle}
            className={clsx(
                props.isActive ? "border-primary-700" : "border-gray-400",
                `h-6 w-14 py-1 rounded-xl bg-white border-2  flex items-center `
            )}
        >
            <motion.div
                animate={{
                    x: !props.isActive ? 5 : 30,
                }}
                transition={{
                    type: "spring",
                }}
                className={clsx(
                    props.isActive ? "bg-primary-700" : "bg-gray-400",
                    "h-4 w-4 rounded-full"
                )}
            ></motion.div>
        </div>
    );
}

export default Toggler;
