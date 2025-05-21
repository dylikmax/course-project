import { Link } from "react-router-dom"
import "./Order.css"
import ProductInOrder from "./ProductInOrder"

export default function Order({ order }) {
    return <div to={"/orders/"+order.id} className="order">
        <h5>Заказ №{order.id}</h5>
        <div className="order__info">
        <span className="order__status">
            Статус: {order.status}
        </span>
        <span className="order__address">
            Адрес доставки: {order.address}
        </span>
        <span className="order__price">
            {order.price} BYN
        </span>
        <Link to={"/orders/" + order.id} className="order__btn"><button>Детали заказа</button></Link>
        </div>
        <div className="order__products">
            {order.products.map((product, i) => <ProductInOrder product={product} key={i}/>)}
        </div>
    </div>
}