import "./Store.css";

import axios from "axios";
import {useEffect, useState} from "react";
import {Button, Card, Col,Row} from "antd";
import {getCookie, nameCookie} from "../../utils/cookie";
const { Meta } = Card;

function Store() {
    const [products, setProducts] = useState([]);
    useEffect(() => getProducts(setProducts), []);

    return (
        <div className="Store">
            <Row>
            {products && products.map((product) => {
                return <Col span={6}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={"https://" + product.image} />}
                        >
                        <Meta title="Producto" description={product.description} />
                        <Meta title="Precio" description={"$" + product.price} />
                        <Button onClick={() => addProductCar(product)} type="primary" shape="round"> Agregar </Button>
                    </Card>
                </Col>
            })}
            </Row>
        </div>
    );
}
async function addProductCar(product){
    const carId = getCookie(nameCookie);

    if (carId !== ''){
        try {
            console.log(product)
            const body = { products: [product._id] };
            await axios.put('http://localhost:3000/cars/add_product/'+ carId , body)
        }catch (e){
            console.error("Cannot add product shopping car", e);
        }
    }
}

async function getProducts(setProducts){
    try{
        const response = await axios.get('http://localhost:3000/products')
        setProducts(response.data);
    }catch (e){
        console.error("error getting products", e);
    }

}

export default Store;

