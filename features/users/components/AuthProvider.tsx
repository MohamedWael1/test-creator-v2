import Spinner from "@/features/ui/Spinner";
import auth from "@/lib/auth";
import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext<{
    user: User | null | undefined;
    token?: string;
    isLoading: boolean;
}>({
    user: undefined,
    isLoading: true,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

function AuthProvider(props: AuthProviderProps) {
    const [data, setData] = useState<{
        user: User | null | undefined;
        token?: string;
    }>({ user: undefined, token: undefined });
    

    useEffect(() => {
        const unsubscribe = auth.addListener(setData);
        setData(auth.getAuthData());
        return () => unsubscribe();
    }, []);

    const value = useMemo(() => {
        return {
            ...data,
            isLoading: data.user === undefined,
        };
    }, [data?.user]);


    return (
        <AuthContext.Provider value={value}>
            {value.isLoading ? <Spinner /> : props.children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthProvider;
