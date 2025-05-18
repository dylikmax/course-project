import ProductInCart from "../../components/product-in-cart/ProductInCart"
import "./CartPage.css"

const cart = {
  "products": [
    {
      "id": 1,
      "product_id": 1,
      "name": "Левое зеркало",
      "description": "Зеркало на водительскую дверь, имеется электронная регулировка и подогрев.",
      "image_url": "https://r.autostrong-m.by/p/10000932",
      "car": "Audi A4 B5",
      "color": "Тёмно-зелёный",
      "price": "49.95",
      "count": 2
    },
    {
      "id": 2,
      "product_id": 3,
      "name": "Задняя правая дверь",
      "description": null,
      "image_url": "https://magauto102.ru/wp-content/uploads/2023/10/photo_07_10_2023_06_18_34",
      "car": "ВАЗ 2114",
      "color": "Серый",
      "price": "89.99",
      "count": 1
    },
    {
      "id": 3,
      "product_id": 19,
      "name": "Левая передняя дверь",
      "description": "Имеется электростеклоподъемник. Небольшой заводской деффект в виде царапины в районе ручки.",
      "image_url": "https://avcdn.av.by/advertmedium/0003/8598/2794.jpg",
      "car": "Audi A4 B5",
      "color": "Серый",
      "price": "200.00",
      "count": 2
    }
  ],
  "sum": 589.89
}

export default function CartPage() {
    return <div className="cart-page">
        <div className="cart-page__container">
            <h2>Корзина</h2>
            <div className="main-cont">
            <div className="products">
                {cart.products.map(product => <ProductInCart product={product}/>)}
            </div>
            </div>
        </div>
    </div>
}