import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css"
import API from "../../api/api";

export default function RegisterPage() {
    const navigate = useNavigate();
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
        
        const currentErrors = {
            login: formData.login.includes(" ") ? "Логин не должен содержать пробельных символов." : formData.login.length < 3 ? "Логин должен быть длиной минимум 3 символа." : "",
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? "" : "Некорректный формат электронной почты.",
            password: formData.password.length < 8 ? "Длина пароля должна быть минимум 8 символов" : "",
            passwordRepeat: formData.password !== formData.passwordRepeat ? "Пароли не совпадают" : ""
        }
        console.log(formData.password, currentErrors);

        setErrors(currentErrors)
        
        if(Object.values(currentErrors).some(value => value.length !== 0)) {
            return;
        }

        const register = async () => {
            try {
                await API.register(formData);

                window.location.reload()
            } catch (error) {
                
                if (error.message === "Bad Request") {
                    const error = { ...currentErrors, login: 'Пользователь с таким логином уже существует.' };
                    setErrors(error);
                }
            }
        }
        
        register();
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