import "./Order.css"

export default function ProductInOrder({ product }) {
    return <div className="order-product">
        <img src={product.image_url ? product.image_url : "/svg/null-image.svg"} className="order-product__image"/>
        <span className="order-product__name">{product.name}</span>
    </div>
}