import clsx from "clsx";
import React from "react";

function ErrorMessage(props: React.ComponentProps<"div">) {
    const { className, ...rest } = props;
    return <div className={clsx("text-red-600 my-1 mx-4 text-sm animate-pulse ", className)} {...rest}></div>;
}




export default ErrorMessage;
