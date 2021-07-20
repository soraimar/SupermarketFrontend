import "./Store.css";

import axios from "axios";
import {useEffect, useState} from "react";
import { Card, Col,Row} from "antd";
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
                    </Card>
                </Col>
            })}
            </Row>
        </div>
    );
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

