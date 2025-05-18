import { Link } from "react-router-dom"
import "./ProductPage.css"

const product = {
    "id": 1,
    "name": "Левое зеркало",
    "description": "Зеркало на водительскую дверь, имеется электронная регулировка и подогрев.",
    "image_url": "https://r.autostrong-m.by/p/10000932",
    "car": "Audi A4 B5",
    "color": "Тёмно-зелёный",
    "price": "49.95"
}

export default function ProductPage() {
    return <div className="product-page">
        <div className="product-page__container">
            <img src={product.image_url ? product.image_url : "/svg/null-image.svg"} className="pp__product-img" />
            <div className="pp__info">
            <h6>{product.name}</h6>
            <div className="char">
            Описание
            <span className="pp__char">{product.description ? product.description : "Описание отсутствует"}</span>
            </div>
            <div className="char">
            Автомобиль
            <span className="pp__char">{product.car ? product.car : "–" }</span>
            </div>
            <div className="char">
            Цвет<span className="pp__char">{product.color ? product.color : "–" }</span>
            </div>
            <div className="bottom-blocks">
                <div className="bb__buttons">
                <div className="bb__btn"><button>В корзину</button></div>
                <div className="bb__btn"><Link to="/products"><button>Все товары</button></Link></div>
                </div>
            <span className="pp__price">{product.price + " BYN"}</span>
            </div>
            </div>
        </div>
    </div>
}