import { Link, useNavigate } from "react-router-dom";
import "./ProfilePage.css"
import { useEffect, useState } from "react";
import API from "../../api/api";

export default function ProfilePage() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const fetchedMe = await API.getMe();
            setUser(fetchedMe)
        }
              
        fetchData();
    },[])

    const handleLogout = async () => {
        const fetchData = async () => {
            await API.logout();
            navigate();
        }
              
        fetchData();
    }

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
                    <div className="btn"><button onClick={handleLogout}>Выйти из аккаунта</button></div>
                </div>
            </div>
        </div>
    </div>
}