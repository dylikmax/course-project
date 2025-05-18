import { Link } from "react-router-dom";
import "./ProfilePage.css"

const user = {
    login: "Абвгд",
    email: "a@gmail.com",
    id: 1,
    create_time: "2025-05-16T21:02:28.000Z"
};

export default function ProfilePage() {

    const date = new Date(user.create_time);    

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDate = date.toLocaleString('ru-RU', options);

    return <div className="profile-page">
        <div className="profile-page__container">
            <img src="/svg/avatar.svg" className="avatar" />
            <div className="side">
            <div className="user-info">
                <div className="user-info__block">
                    <span className="info-block__name">Логин</span>
                    {user.login}
                </div>
                <div className="user-info__block">
                    <span className="info-block__name">Электронная почта</span>
                    {user.email}
                </div>
                <div className="user-info__block">
                    <span className="info-block__name">Аккаунт создан</span>
                    <span className="info-block__sub">{formattedDate}</span>
                </div>
                </div>
                <div className="buttons">
                    <div className="btn"><Link to="/change-password"><button>Сменить пароль</button></Link></div>
                    <div className="btn"><button>Выйти из аккаунта</button></div>
                </div>
            </div>
        </div>
    </div>
}