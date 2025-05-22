import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css"
import API from "../../api/api";

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        login: '',
        password: ''
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
            password: formData.password < 8 ? "Длина пароля должна быть минимум 8 символов" : "",
        }

        setErrors(currentErrors)
        
        if(Object.values(currentErrors).some(value => value.length !== 0)) {
            return;
        }

        const login = async () => {
            try {
                await API.login(formData);

                window.location.reload()
            } catch (error) {
                console.log(error);
                
                if (error.message === "Bad Request" || error.message === "Not Found") {
                    const error = { ...currentErrors, login: 'Неверный логин или пароль.' };
                    setErrors(error);
                }
            }
        }
        
        login();
    };


    return <div className="form-page">
        <div className="form-page__container">
        <h2>Вход</h2>
        <form action="/login" onSubmit={handleSubmit} className="form">
            <div className="form__row">
                <label htmlFor="login">Логин:</label>
                <input type="text" id="login" name="login" value={formData.login} onChange={handleChange}/>
                <div className="row-error">{errors.login}</div>
            </div>
            <div className="form__row">
                <label htmlFor="password">Пароль:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
                <div className="row-error">{errors.password}</div>
            </div>
            <button type="submit">Войти</button>
        </form>
        <div className="form-page__text">Нет аккаунта? <Link to="/register" className="span-link">Регистрация</Link></div>
        </div>
    </div>
}