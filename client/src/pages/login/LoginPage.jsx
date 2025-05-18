import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css"

export default function LoginPage() {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Form Data:', formData);

    };


    return <div className="form-page">
        <div className="form-page__container">
        <h2>Вход</h2>
        <form action="/login" onSubmit={handleSubmit} className="form">
            <div className="form__row">
                <label htmlFor="login">Логин:</label>
                <input type="text" id="login" name="login" value={formData.login} onChange={handleChange}/>
            </div>
            <div className="form__row">
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
            </div>
            <button type="submit">Войти</button>
        </form>
        <div className="form-page__text">Нет аккаунта? <Link to="/register" className="span-link">Регистрация</Link></div>
        </div>
    </div>
}