import { useEffect, useState } from "react"
import Order from "../../components/order/Order"
import "./OrdersPage.css"
import API from "../../api/api"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const fetchedOrders = await API.getOrders();
        setOrders(fetchedOrders)
      }

      fetchData();
    }, [])

    return <div className="products-page">
        <div className="products-page__container">
            <h2>Мои заказы</h2>
            <div className="main-cont">
              {orders.length ? 
            <div className="products">
                {orders.map(order => <Order order={order} key={order.id}/>)}
            </div>
            : <div className="no-orders">У вас пока что нет заказов.</div>}
            </div>
        </div>
    </div>
}