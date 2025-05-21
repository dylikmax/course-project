import { useEffect, useState } from "react";
import "./NewOrderPage.css"
import Product from "../../components/product/Product";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";

export default function NewOrderPage() {
  const navigate = useNavigate();
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

    const [formData, setFormData] = useState({
        address: ''
    });

        const [errors, setErrors] = useState({
        address: ''
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const currentErrors = {
          address: formData.address ? cart.products.length ? "" : "Нельзя сделать пустой заказ." : "Введите адрес доставки."
        }

        setErrors(currentErrors)
        
        if(Object.values(currentErrors).some(value => value.length !== 0)) {
            return;
        }

        const fetchData = async () => {
          try {
            await API.createOrder(formData);
            navigate("/orders")
          } catch (error) {
            console.log(error.message);
            
          }
        }
  
        fetchData();
    };


    return <div className="new-order-page">
        <div className="new-order-page__container">
        <h2>Оформление заказа</h2>
        <form action="/login" onSubmit={handleSubmit} className="form">
            <div className="form__row">
                <label htmlFor="text">Введите адрес доставки:</label>
                <input type="text" id="address" name="address" value={formData.confirmNewPassword} onChange={handleChange}/>
                <div className="row-error">{errors.address}</div>
            </div>
            <button type="submit">Оформить заказ</button>
        </form>
        <Link to="/cart"><button type="submit">Перейти в корзину</button></Link>
        <div className="order-page__products">
            <h5>Товары в корзине:</h5>
            {cart.products.map((product, i) => <Product product={product} key={i}/>)}
        </div>
        </div>
    </div>
}