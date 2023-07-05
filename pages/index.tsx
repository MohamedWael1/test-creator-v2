import { Inter } from "next/font/google";
import WithPrivate from "@/features/users/components/WithPrivate/WithPrivate";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <WithPrivate>
            Home
        </WithPrivate>
    );
}


