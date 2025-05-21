import { Link, useNavigate, useParams } from "react-router-dom"
import "./ProductPage.css"
import { useEffect, useState } from "react"
import API from "../../api/api"


export default function ProductPage() {
    const [product, setProduct] = useState({})
    const navigate = useNavigate();

    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const fetchedProduct = await API.getProduct(id);

            setProduct(fetchedProduct)
        }

        fetchData();
    }, [])

    const handleClick = () => {
        const fetchData = async () => {
            await API.toCart(id);
            navigate("/cart")
        }

        fetchData();
    }

    return <div className="product-page">
        <div className="product-page__container">
            <img src={product.image_url ? product.image_url : "/svg/null-image.svg"} className="pp__product-img" />
            <div className="pp__info">
            <h6>{product.name}</h6>
            <div className="char">
            Описание
            <span className="pp__char">{product.description ? product.description : "Описание отсутствует"}</span>
            </div>
            <div className="char">
            Автомобиль
            <span className="pp__char">{product.car ? product.car : "–" }</span>
            </div>
            <div className="char">
            Цвет<span className="pp__char">{product.color ? product.color : "–" }</span>
            </div>
            <div className="bottom-blocks">
                <div className="bb__buttons">
                <div className="bb__btn"><button onClick={handleClick}>В корзину</button></div>
                <div className="bb__btn"><Link to="/products"><button>Все товары</button></Link></div>
                </div>
            <span className="pp__price">{product.price + " BYN"}</span>
            </div>
            </div>
        </div>
    </div>
}