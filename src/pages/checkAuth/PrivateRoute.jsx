import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { tokenDecode } from "../../utils/tokenHashAndDecode";

const PrivateRoute = ({ children }) => {
    const authantication = jwtDecode(tokenDecode())?.isAuthantication
    const location = useLocation();
    return (
        <>
            {authantication ? (
                children
            ) : (
                <Navigate to={"/login"} replace state={{ location }} />
            )}
        </>
    );
};
export default PrivateRoute;