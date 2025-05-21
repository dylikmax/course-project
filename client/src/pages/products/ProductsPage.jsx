import { useEffect, useState } from "react"
import CheckboxFilter from "../../components/filters/ColorFilter"
import NumberFilter from "../../components/filters/NumberFilter"
import Product from "../../components/product/Product"
import "./ProductsPage.css"
import API from "../../api/api"

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
      colors: [],
      cars: [],
      price: {
        min_price: 0,
        max_price: 0
      }
    })
    const [currentFilters, setCurrentFilters] = useState({
      colors: {},
      cars: {},
      price: {}
    })

    const handleCheckColor = (e) => {
      setCurrentFilters({ ...currentFilters, colors: { ...currentFilters.colors, [e.target.name]: e.target.checked }})
    }

    const handleCheckCar = (e) => {
      setCurrentFilters({ ...currentFilters, cars: { ...currentFilters.cars, [e.target.name]: e.target.checked }})
    }

    const handleChangePrice = (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
      setCurrentFilters({ ...currentFilters, price: { ...currentFilters.price, [e.target.name]: e.target.value }})
    }

    useEffect(() => {
      const fetchData = async () => {
        const fetchedFilters = await API.getFilters();
          setFilters(fetchedFilters);
          setCurrentFilters({
            colors: fetchedFilters.colors.reduce((acc, item) => {
              acc[item] = true;
              return acc;
            }, {}),
            cars: fetchedFilters.cars.reduce((acc, item) => {
              acc[item] = true;
              return acc;
            }, {}),
            price: fetchedFilters.price
          });

        const fetchedProducts = await API.getProducts(currentFilters);
        setProducts(fetchedProducts);
      }
        fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        const fetchedProducts = await API.getProducts(currentFilters);
        
        setProducts(fetchedProducts);
      }
        fetchData();
    }, [currentFilters]);

  return <div className="products-page">
        <div className="products-page__container">
            <h2>Поиск по товарам</h2>
            <div className="main-cont">
            <div className="filters">
                <h3>Фильтры</h3>
                <div className="filters__colors">
                    <h4>Цвета</h4>
                    {filters.colors.map((filter, i) => <CheckboxFilter value={filter} key={i} onCheck={handleCheckColor} checked={currentFilters.colors[filter]}/>)}
                </div>
                <div className="filters__cars">
                    <h4>Автомобили</h4>
                    {filters.cars.map((filter, i) => <CheckboxFilter value={filter} key={i} onCheck={handleCheckCar} checked={currentFilters.cars[filter]}/>)}
                </div>
                <div className="filters__price">
                    <h4>Цена</h4>
                    <NumberFilter text="От" id={'min_price'} onChange={handleChangePrice} value={currentFilters.price.min_price}/>
                    <NumberFilter text="До" id={'max_price'} onChange={handleChangePrice} value={currentFilters.price.max_price}/>
                </div>
            </div>
            <div className="products">
                {products.map(product => <Product product={product} key={product.id}/>)}
            </div>
            </div>
        </div>
    </div>
}