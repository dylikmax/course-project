import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        passwordRepeat: ''
    });

    const [errors, setErrors] = useState({
        login: '',
        email: '',
        password: '',
        passwordRepeat: ''
    })

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
        <h2>Регистрация</h2>
        <form action="/login" onSubmit={handleSubmit} className="form">
            <div className="form__row">
                <label htmlFor="login">Логин:</label>
                <input type="text" id="login" name="login" value={formData.login} onChange={handleChange}/>
                <div className="row-error">{errors.login}</div>
            </div>
            <div className="form__row">
                <label htmlFor="email">Электронная почта:</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}/>
                <div className="row-error">{errors.email}</div>
            </div>
            <div className="form__row">
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
                <div className="row-error">{errors.password}</div>
            </div>
            <div className="form__row">
                <label htmlFor="passwordRepeat">Повторите пароль:</label>
                <input type="password" id="passwordRepeat" name="passwordRepeat" value={formData.passwordRepeat} onChange={handleChange}/>
                <div className="row-error">{errors.passwordRepeat}</div>
            </div>
            <button type="submit">Зарегистрироваться</button>
        </form>
        <div className="form-page__text">Есть аккаунт? <Link to="/login" className="span-link">Вход</Link></div>
        </div>
    </div>
}