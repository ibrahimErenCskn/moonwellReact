import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { tokenDecode } from "../../utils/tokenHashAndDecode";
import { PUBLIC_ROUTE, ROUTE_DATA } from "../../utils/leftSideRoute";

const RoleController = ({ children }) => {
    const role = jwtDecode(tokenDecode())?.role
    const location = useLocation();
    const roleCheck = ROUTE_DATA.filter(v => location.pathname === v.route && v?.role?.includes(role))
    const publicRoute = PUBLIC_ROUTE.filter(v => location.pathname === v)
    return (
        <>

            {roleCheck.length > 0 ? (
                children
            ) : (
                publicRoute.length > 0 ? children : <Navigate to={"/"} replace state={{ location }} />
            )}
        </>
    );
};
export default RoleController;