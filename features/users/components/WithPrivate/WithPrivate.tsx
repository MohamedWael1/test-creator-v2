import { useRouter } from "next/router";
import { useAuth } from "../AuthProvider";
import { useEffect } from "react";

interface WithPrivateProps {
    children: React.ReactNode;
}

function WithPrivate(props: WithPrivateProps) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }
        , [user]
    )

    return (
        <div>
            {props.children}
        </div>

    )
}


export default WithPrivate;