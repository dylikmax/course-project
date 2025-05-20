import { Link } from "react-router-dom"
import "./Order.css"
import ProductInOrder from "./ProductInOrder"

export default function Order({ order }) {
    return <Link to={"/orders/"+order.id} className="order">
        <h5>Заказ №{order.id}</h5>
        <span className="order__status">
            Статус: {order.status}
        </span>
        <span className="order__address">
            Адрес доставки: {order.address}
        </span>
        <span className="order__price">
            {order.price} BYN
        </span>
        <div className="order__products">
            {order.products.map((product, i) => <ProductInOrder product={product} key={i}/>)}
        </div>
    </Link>
}