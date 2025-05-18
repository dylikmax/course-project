import { Link } from "react-router-dom";
import "./ErrorPage.css"

export default function ErrorPage() {
    return <div className="error-page">
        <div className="error-page__container">
        <h1>Страница не найдена</h1>
        <div className="form-page__text">Кажется, страницы, на которую вы пытаетесь попасть, не существует. <Link to="/" className="span-link">На главную</Link></div>
    </div>
    </div>
}