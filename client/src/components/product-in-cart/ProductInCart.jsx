import { Link } from "react-router-dom"
import "./ProductInCart.css"

export default function ProductInCart({ product }) {
    return <div className="product-in-cart">
        <img src={product.image_url ? product.image_url : "/svg/null-image.svg"} className="product__img" />
        <div className="product__info">
            <h5>{product.name}</h5>
            <span className="info__char">{product.car}</span>
            <span className="info__char">{product.color}</span>
            <span className="info__price">{product.price + " BYN"}</span>
        </div>
        <div className="product__cart-actions">
            <div className="count">
            <span className="actions__count">Количество в корзине:</span>
            <div className="count-control">
                <div className="icon minus"></div>
                <span className="actions__number-count">{product.count}</span>
                <div className="icon plus"></div>
            </div>
            </div>
            <div className="actions__buttons">
                <Link to={"/products/" + product.id}><button>Перейти к товару</button></Link>
                <button>Убрать из корзины</button>
            </div>
        </div>
    </div>
}