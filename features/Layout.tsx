import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "./users/components/AuthProvider";
import auth from "@/lib/auth";

const NAV_LINKS = [
    {
        name: "Dashboard",
        path: `/dashboard/tests`,
    },
    {
        name: "Create-Test",
        path: "/create-test",
    },
];

const SIDE_NAV_LINKS = [
    {
        name: "Tests",
        path: "/dashboard/tests",
    },
    {
        name: "Responses",
        path: "/dashboard/responses",
    },
];

// function DesktopDashboardNav() {
//     const { pathname } = useRouter();
//     return (
//         <div className="max-w-[300px] min-w-[200px] z-10 fixed h-screen top-20  border-r-2">
//             <ul className="flex flex-col items-center py-20 text-gray-500 font-semibold">
//                 {SIDE_NAV_LINKS.map((link) => (
//                     <li
//                         className="flex flex-col items-center justify-center py-2"
//                         key={link.path}
//                     >
//                         <Link href={link.path} className="pr-2">
//                             {link.name}
//                             {pathname === link.path ? (
//                                 <div className=" w-full h-1 bg-indigo-500 rounded-full"></div>
//                             ) : null}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

function DashboardNav() {
    const { pathname, push } = useRouter();
    return (
        <nav className="max-w-[300px] min-w-[200px] pt-8  border-b-2 mx-auto flex items-center  justify-center">
            <ul className="flex  justify center  text-gray-500 font-semibold">
                {SIDE_NAV_LINKS.map((link) => (
                    <li
                        className="flex flex-col items-center justify-center py-2"
                        key={link.path}
                    >
                        <Link href={link.path} className="pr-2">
                            {link.name}
                            {pathname === link.path ? (
                                <div className=" w-full h-1 bg-indigo-500 rounded-full"></div>
                            ) : null}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function Navbar() {
    const { pathname } = useRouter();

    return (
        <nav className="bg-white border-2 border-gray-200 rounded-full min-h-[40px] text-gray-500 z-10 max-w-lg font-semibold w-full mx-auto ">
            <ul className="flex justify-center">
                {NAV_LINKS.map((link) => (
                    <li
                        className="flex flex-col items-center justify-center"
                        key={link.path}
                    >
                        <Link href={link.path} className="pr-2">
                            {link.name}
                            {pathname === link.path ? (
                                <div className=" w-full h-1 bg-indigo-500 rounded-full"></div>
                            ) : null}
                        </Link>
                    </li>
                ))}
                <li onClick={() => auth.logout()} className="cursor-pointer">
                    Logout
                </li>
            </ul>
        </nav>
    );
}

interface LayoutProps {
    children: React.ReactNode;
}
function Layout(props: LayoutProps) {
    const router = useRouter();
    return (
        <div className="bg-slate-100 min-h-screen w-full py-4 ">
            <Navbar />
            {router.pathname === "/create-test" ? "" : <DashboardNav />}
            <main className="mx-10 py-4 ">{props.children}</main>
        </div>
    );
}

export default Layout;
