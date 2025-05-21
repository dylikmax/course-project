import {  useState } from "react";
import "./ChangePasswordPage.css"
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
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
            oldPassword: '',
            newPassword: formData.newPassword.length < 8 ? 'Новый пароль должен быть минимум 8 символов в длину' : '',
            confirmNewPassword:  formData.newPassword !==  formData.confirmNewPassword ? 'Пароли должны совпадать' : ''
        }

        setErrors(currentErrors)
        
        if(Object.values(currentErrors).some(value => value.length !== 0)) {
            return;
        }

        const changePassword = async () => {
            try {
                await API.changePassword(formData);
                
                navigate("/profile")
            } catch (error) {
                if (error.message === "Bad Request") {
                    const error = { ...currentErrors, oldPassword: 'Неверный пароль.' };
                    setErrors(error);
                }
            }
        }
        
        changePassword();
    };


    return <div className="form-page-chng">
        <div className="form-page__container">
        <h2>Смена пароля</h2>
        <form action="/login" onSubmit={handleSubmit} className="form">
            <div className="form__row">
                <label htmlFor="login">Старый пароль:</label>
                <input type="password" id="oldPassword" name="oldPassword" value={formData.oldPassword} onChange={handleChange}/>
                <div className="row-error">{errors.oldPassword}</div>
            </div>
            <div className="form__row">
                <label htmlFor="password">Новый пароль:</label>
                <input type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange}/>
                <div className="row-error">{errors.newPassword}</div>
            </div>
            <div className="form__row">
                <label htmlFor="password">Подтвердите новый пароль:</label>
                <input type="password" id="confirmNewPassword" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange}/>
                <div className="row-error">{errors.confirmNewPassword}</div>
            </div>
            <button type="submit">Сменить пароль</button>
        </form>
        </div>
    </div>
}