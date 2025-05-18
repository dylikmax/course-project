import CheckboxFilter from "../../components/filters/ColorFilter"
import NumberFilter from "../../components/filters/NumberFilter"
import Product from "../../components/product/Product"
import "./ProductsPage.css"

const filters = {
  "cars": [
    "Audi A4 B5",
    "BMW 3-series E36",
    "BMW 3-series E46",
    "Volkswagen Polo 2015",
    "ВАЗ 2114"
  ],
  "colors": [
    "Серый",
    "Тёмно-зелёный",
    "Чёрный"
  ],
  "price": {
    "min_price": "19.99",
    "max_price": "200.00"
  }
}

const products = [
  {
    "id": 1,
    "name": "Левое зеркало",
    "description": "Зеркало на водительскую дверь, имеется электронная регулировка и подогрев.",
    "image_url": "https://r.autostrong-m.by/p/10000932",
    "car": "Audi A4 B5",
    "color": "Тёмно-зелёный",
    "price": "49.95"
  },
  {
    "id": 2,
    "name": "Передние тормозные диски",
    "description": null,
    "image_url": "https://zapzap.by/media/files/adb_rebuild_modern/16.png",
    "car": "BMW 3-series E46",
    "color": null,
    "price": "69.69"
  },
  {
    "id": 3,
    "name": "Задняя правая дверь",
    "description": null,
    "image_url": "https://magauto102.ru/wp-content/uploads/2023/10/photo_07_10_2023_06_18_34",
    "car": "ВАЗ 2114",
    "color": "Серый",
    "price": "89.99"
  },
  {
    "id": 4,
    "name": "Задние фонари",
    "description": null,
    "image_url": "https://a.d-cd.net/b8dd9ds-1920.jpg",
    "car": "Audi A4 B5",
    "color": null,
    "price": "129.99"
  },
  {
    "id": 5,
    "name": "Передний бампер",
    "description": null,
    "image_url": null,
    "car": "Volkswagen Polo 2015",
    "color": "Чёрный",
    "price": "99.99"
  },
  {
    "id": 6,
    "name": "Задний бампер",
    "description": null,
    "image_url": "https://protuning.com/media/cache/product_page_image/uploads/images/97/image-5111323jom-1.jpg",
    "car": "BMW 3-series E46",
    "color": "Серый",
    "price": "119.99"
  },
  {
    "id": 7,
    "name": "Передние фары",
    "description": "Рестайлинг LED Black",
    "image_url": "https://design-tuning.com/images/img_item/17079886290.JPG",
    "car": "BMW 3-series E46",
    "color": null,
    "price": "189.99"
  },
  {
    "id": 8,
    "name": "Балка подвески",
    "description": "Задняя, рестайлинг",
    "image_url": "https://st.carro.su/gallery/version/118/car-part/32829777/148161040/base.jpg",
    "car": "Volkswagen Polo 2015",
    "color": null,
    "price": "119.99"
  },
  {
    "id": 9,
    "name": "Задний бампер",
    "description": null,
    "image_url": "https://i0774.ru/i/2229/600/60008338-354104b3530135462abfb941d8c87549.jpg",
    "car": "Audi A4 B5",
    "color": "Чёрный",
    "price": "109.99"
  },
  {
    "id": 10,
    "name": "Левое зеркало",
    "description": null,
    "image_url": null,
    "car": "ВАЗ 2114",
    "color": "Чёрный",
    "price": "39.99"
  },
  {
    "id": 11,
    "name": "Дворники",
    "description": "Щётки стеклоочистителя 2 шт., 600мм, каркасные",
    "image_url": "https://ir-3.ozone.ru/s3/multimedia-r/c1000/6523567503.jpg",
    "car": null,
    "color": null,
    "price": "24.99"
  },
  {
    "id": 12,
    "name": "Пружины передние",
    "description": "Небольшой заводской деффект в виде царапины на одной из пружин",
    "image_url": "https://tuningprosto.ru/upload/iblock/923/923a561c4678ccbb6cb6607dce95aaf3.jpg",
    "car": "ВАЗ 2114",
    "color": null,
    "price": "49.99"
  },
  {
    "id": 13,
    "name": "Редуктор газовый",
    "description": null,
    "image_url": "https://avcdn.av.by/advertmedium/0002/5427/5157.jpg",
    "car": "Volkswagen Polo 2015",
    "color": null,
    "price": "149.99"
  },
  {
    "id": 14,
    "name": "Свеча зажигания",
    "description": null,
    "image_url": "https://auto1.by/ImageService/full/387/43018Z.JPG",
    "car": "BMW 3-series E36",
    "color": null,
    "price": "19.99"
  },
  {
    "id": 15,
    "name": "Амортизаторы",
    "description": null,
    "image_url": "https://auto1.by/ImageService/full/32/0032290985.JPG",
    "car": "BMW 3-series E46",
    "color": null,
    "price": "84.99"
  },
  {
    "id": 16,
    "name": "Передние фары",
    "description": "Дорестайлинг LED Black",
    "image_url": null,
    "car": "BMW 3-series E36",
    "color": null,
    "price": "79.99"
  },
  {
    "id": 17,
    "name": "Резина летняя",
    "description": "Комплект летней резины, 17-ый радиус",
    "image_url": "https://megasklad24.by/storage/items/thumb/w310_h310_0929bcc7-8e8a-44ee-9d31-15affa90efb8.jpeg",
    "car": null,
    "color": null,
    "price": "109.99"
  },
  {
    "id": 18,
    "name": "Передний бампер",
    "description": null,
    "image_url": "https://sales24.by/wp-content/uploads/pl-09200.jpg",
    "car": "Volkswagen Polo 2015",
    "color": "Серый",
    "price": "99.99"
  },
  {
    "id": 19,
    "name": "Левая передняя дверь",
    "description": "Имеется электростеклоподъемник. Небольшой заводской деффект в виде царапины в районе ручки.",
    "image_url": "https://avcdn.av.by/advertmedium/0003/8598/2794.jpg",
    "car": "Audi A4 B5",
    "color": "Серый",
    "price": "200.00"
  },
  {
    "id": 20,
    "name": "Глушитель",
    "description": null,
    "image_url": "https://ir-3.ozone.ru/s3/multimedia-k/c1000/6381397412.jpg",
    "car": "ВАЗ 2114",
    "color": null,
    "price": "89.99"
  }
]

export default function ProductsPage() {
    return <div className="products-page">
        <div className="products-page__container">
            <h2>Поиск по товарам</h2>
            <div className="main-cont">
            <div className="filters">
                <h3>Фильтры</h3>
                <div className="filters__colors">
                    <h4>Цвета</h4>
                    {filters.colors.map((filter, i) => <CheckboxFilter value={filter} key={i}/>)}
                </div>
                <div className="filters__cars">
                    <h4>Автомобили</h4>
                    {filters.cars.map((filter, i) => <CheckboxFilter value={filter} key={i}/>)}
                </div>
                <div className="filters__price">
                    <h4>Цена</h4>
                    <NumberFilter text="От"/>
                    <NumberFilter text="До"/>
                </div>
            </div>
            <div className="products">
                {products.map(product => <Product product={product}/>)}
            </div>
            </div>
        </div>
    </div>
}