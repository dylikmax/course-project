import { Link } from "react-router-dom";
import "./HomePage.css"

export default function HomePage() {
    return <div className="home-page">
        <Link to="/products" className="home-page__button">
            <svg width="140" height="140" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_959_2)">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M55 17.5L30 5L5 17.5V42.5L30 55L55 42.5V17.5Z" stroke="currentColor" stroke-width="3.75" stroke-linejoin="round"/>
            <path d="M5 17.5L30 30" stroke="currentColor" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M30 55V30" stroke="currentColor" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M55 17.5L30 30" stroke="currentColor" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M42.5 11.25L17.5 23.75" stroke="currentColor" stroke-width="3.75" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_959_2">
            <rect width="60" height="60" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            Товары
        </Link>
        <Link to="/cart" className="home-page__button">
        <svg width="140" height="140" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7494 12.5H52.5L47.5 30H18.4418M50 40H20L15 7.5H7.5M22.5 50C22.5 51.3807 21.3807 52.5 20 52.5C18.6193 52.5 17.5 51.3807 17.5 50C17.5 48.6193 18.6193 47.5 20 47.5C21.3807 47.5 22.5 48.6193 22.5 50ZM50 50C50 51.3807 48.8807 52.5 47.5 52.5C46.1193 52.5 45 51.3807 45 50C45 48.6193 46.1193 47.5 47.5 47.5C48.8807 47.5 50 48.6193 50 50Z" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
            Корзина
        </Link>
        <Link to="/orders" className="home-page__button">
            <svg width="140" height="140" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.14072 59.9531C2.76572 59.9531 2.39072 59.8125 2.10947 59.4844C1.82822 59.2031 1.68759 58.8281 1.73447 58.4062L4.68759 13.0312C4.73447 12.2812 5.34384 11.7187 6.09384 11.7187H18.4688V11.5312C18.4688 8.4375 19.6876 5.57812 21.8438 3.375C24.047 1.26562 26.9063 0.046875 30.0001 0.046875C36.3282 0.046875 41.5313 5.20312 41.5313 11.5781C41.5313 11.625 41.4845 11.6719 41.4845 11.7187V11.7656H53.9063C54.6563 11.7656 55.2657 12.3281 55.3126 13.0781L58.2188 58.125C58.2657 58.2656 58.2657 58.3594 58.2657 58.5C58.2188 59.2969 57.6095 59.9531 56.8126 59.9531H3.14072ZM4.64072 57.1406H55.3126L52.5938 14.5781H41.4845V17.9531H41.5313C42.2813 18.4688 42.7032 19.2188 42.7032 20.0625C42.7032 21.5156 41.5313 22.6875 40.0782 22.6875C38.6251 22.6875 37.4532 21.5156 37.4532 20.0625C37.4532 19.2188 37.8751 18.4688 38.6251 17.9531H38.672V14.5781H21.2813V17.9531H21.3282C22.0782 18.4688 22.5001 19.2188 22.5001 20.0625C22.5001 21.5156 21.3282 22.6875 19.8751 22.6875C18.422 22.6875 17.2501 21.5156 17.2501 20.0625C17.2501 19.2188 17.672 18.4688 18.422 17.9531H18.4688V14.5781H7.35947L4.64072 57.1406ZM30.0001 2.90625C25.2188 2.90625 21.2813 6.79687 21.2813 11.625V11.8125H38.7657L38.7188 11.7187V11.625C38.7188 6.79687 34.7813 2.90625 30.0001 2.90625Z" fill="currentColor"/>
            </svg>

            Заказы
        </Link>
    </div>
}