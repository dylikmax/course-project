import { Link } from "react-router-dom"
import ProductInCart from "../../components/product-in-cart/ProductInCart"
import "./CartPage.css"
import { useEffect, useState } from "react"
import API from "../../api/api"

export default function CartPage() {
    const [cart, setCart] = useState({
      products: [],
      sum: 0
    })

    useEffect(() => {
      const fetchData = async () => {
        const fetchedCart = await API.getCart();
        setCart(fetchedCart)
      }

      fetchData();
    }, [])

    const handleClearCart = () => {
      const fetchData = async () => {
        await API.clearCart();
        setCart({
      products: [],
      sum: 0
    })
      }

      fetchData();
    }

    const handleAddProduct = (id) => () => {
      const fetchData = async () => {
        await API.toCart(id);
        const fetchedCart = await API.getCart();
        setCart(fetchedCart)
      }

      fetchData();
    }

    const handleDeleteProduct = (id, count) => () => {
      const fetchData = async () => {
        await API.deleteFromCart(id, count);
        const fetchedCart = await API.getCart();
        setCart(fetchedCart)
      }

      fetchData();
    }
    
    return <div className="cart-page">
        <div className="cart-page__container">
          <div className="top-inf">
            <h2>Корзина</h2>
            <div className="cart__side-menu">
              Итого: {cart.sum} BYN
              <div className="side-menu__buttons">
                <div className="btn"><Link to="/orders/new"><button>Оформить заказ</button></Link></div>
                <div className="btn"><button onClick={handleClearCart}>Очистить корзину</button></div>
              </div>
            </div>
            </div>
            <div className="main-cont">
              <div className="products">
                  {cart.products.length ? cart.products.map(product => <ProductInCart product={product} key={product.id} addFcn={handleAddProduct} delFcn={handleDeleteProduct}/>) : <div className="no-orders">Ваша корзина пуста.</div>}
              </div>
            </div>
        </div>
    </div>
}