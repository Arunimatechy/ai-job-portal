import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleRoute({
    children,
    role,
}) {

    const userRole =
        useSelector(
            (state) => state.auth.role
        );

    console.log(
        "ROLE CHECK:",
        userRole,
        role
    );

    if (
        userRole?.toLowerCase() !== role
    ) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}