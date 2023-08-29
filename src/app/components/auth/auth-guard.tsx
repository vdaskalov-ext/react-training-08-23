import {FC, PropsWithChildren, ReactNode} from "react";
import {useAuth} from "./auth-context";
import {Navigate, useLocation} from "react-router-dom";
import {storeDeepLink} from "./utils";

export const AuthGuard: FC<PropsWithChildren> = ({children}) => {
    const {isAuthenticated} = useAuth()
    const {pathname} = useLocation()
    if (!isAuthenticated) {
        storeDeepLink(pathname)
        return <Navigate to={"/login"} replace/>
    }

    return <>{children}</>;
}

export const withAuthGuard = (children: ReactNode) => (
    <AuthGuard>{children}</AuthGuard>
)