import { useEffect, useState } from "react"
import Product from "../../components/product/Product"
import "./OrderPage.css"
import API from "../../api/api";
import { useParams } from "react-router-dom";

export default function OrderPage() {
    const [order, setOrder] = useState({
        products: []
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedOrder = await API.getOrder(id);
            setOrder(fetchedOrder)
        }
      
        fetchData();
    }, [])

    return <div className="order-page">
        <div className="order-page__container">
            <h6>Заказ №{order.id}</h6>
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
            <div className="order-page__products">
                <h5>Товары в заказе:</h5>
                {order.products.map((product, i) => <Product product={product} key={i}/>)}
            </div>
        </div>
        </div>
    </div>
}