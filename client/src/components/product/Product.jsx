import { Link } from "react-router-dom"
import "./Product.css"

export default function Product({ product }) {
    return <Link to={"/products/" + product.id} className="product">
        <img src={product.image_url ? product.image_url : "/svg/null-image.svg"} className="product__img" />
        <div className="product__info">
        <h5>{product.name}</h5>
        <span className="info__char">{product.car}</span>
        <span className="info__char">{product.color}</span>
        <span className="info__price">{product.price + " BYN"}</span>
        </div>
    </Link>
}