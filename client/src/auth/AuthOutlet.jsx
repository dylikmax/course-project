import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import API from "../api/api";

const NONAUTHORIZED_ROUTES = ["/login", "/register"];

export default function AuthOutlet() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { isAuth: fetchedIsAuth } = await API.checkAuth();
            console.log(fetchedIsAuth);
            setLoading(false);
            setIsAuth(fetchedIsAuth);
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(loading, isAuth, location.pathname);
        
        if (!loading) {
            if (isAuth && NONAUTHORIZED_ROUTES.includes(location.pathname)) {
                navigate("/");
            } else if (!isAuth && !NONAUTHORIZED_ROUTES.includes(location.pathname)) {
                navigate("/login");
            }
        }
    }, [loading, isAuth, location.pathname]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return <Outlet />;
}