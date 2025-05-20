import Order from "../../components/order/Order"
import "./OrdersPage.css"

const orders = [
  {
    "id": 1,
    "price": "589.89",
    "address": "г. Минск ул. Пушкина д. 36",
    "status": "Собирается",
    "products": [
      {
        "id": 1,
        "name": "Левое зеркало",
        "description": "Зеркало на водительскую дверь, имеется электронная регулировка и подогрев.",
        "car": "Audi A4 B5",
        "color": "Тёмно-зелёный",
        "price": "49.95",
        "count": 2,
        "image_url": "https://r.autostrong-m.by/p/10000932"
      },
      {
        "id": 3,
        "name": "Задняя правая дверь",
        "description": null,
        "car": "ВАЗ 2114",
        "color": "Серый",
        "price": "89.99",
        "count": 1,
        "image_url": "https://magauto102.ru/wp-content/uploads/2023/10/photo_07_10_2023_06_18_34"
      },
      {
        "id": 19,
        "name": "Левая передняя дверь",
        "description": "Имеется электростеклоподъемник. Небольшой заводской деффект в виде царапины в районе ручки.",
        "car": "Audi A4 B5",
        "color": "Серый",
        "price": "200.00",
        "count": 2,
        "image_url": "https://avcdn.av.by/advertmedium/0003/8598/2794.jpg"
      }
    ]
  },
  {
    "id": 2,
    "price": "419.96",
    "address": "г. Минск ул. Пушкина д. 36",
    "status": "Собирается",
    "products": [
      {
        "id": 4,
        "name": "Задние фонари",
        "description": null,
        "car": "Audi A4 B5",
        "color": null,
        "price": "129.99",
        "count": 2,
        "image_url": "https://a.d-cd.net/b8dd9ds-1920.jpg"
      },
      {
        "id": 8,
        "name": "Балка подвески",
        "description": "Задняя, рестайлинг",
        "car": "Volkswagen Polo 2015",
        "color": null,
        "price": "119.99",
        "count": 1,
        "image_url": "https://st.carro.su/gallery/version/118/car-part/32829777/148161040/base.jpg"
      },
      {
        "id": 10,
        "name": "Левое зеркало",
        "description": null,
        "car": "ВАЗ 2114",
        "color": "Чёрный",
        "price": "39.99",
        "count": 1,
        "image_url": null
      }
    ]
  }
]

export default function OrdersPage() {
    return <div className="products-page">
        <div className="products-page__container">
            <h2>Мои заказы</h2>
            <div className="main-cont">
            <div className="products">
                {orders.map(order => <Order order={order}/>)}
            </div>
            </div>
        </div>
    </div>
}