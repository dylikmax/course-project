import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <header>
            <img src="/svg/logo.svg" className="logo" />
            <div className="buttons">
                <NavLink to="/" className={({ isActive }) => (isActive ? "navLink activeButton" : "navLink")}>
                    Главная
                </NavLink>
                <NavLink to="/products" className={({ isActive }) => (isActive ? "navLink activeButton" : "navLink")}>
                    Товары
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => (isActive ? "navLink activeButton" : "navLink")}>
                    Корзина
                </NavLink>
                <NavLink to="/orders" className={({ isActive }) => (isActive ? "navLink activeButton" : "navLink")}>
                    Заказы
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => (isActive ? "navLink activeButton" : "navLink")}>
                    Профиль
                </NavLink>
            </div>
        </header>
    );
}