import "./Navigation.css";
import {Button, Card, Dropdown, Menu} from "antd";
import {useState} from "react";
import axios from "axios";
import {getCookie,nameCookie} from "../../utils/cookie";

function Navigation() {
    const [car, setCar] = useState([])
    var total = 0;
    const menu =  <Menu  className="menu">
        <Menu.Item>Resumen</Menu.Item>
        {car && car.products && car.products.map((product) => {
            return  <Menu.Item>
                <Card
                    hoverable
                    style={{width: 300}}
                    cover={<img src={"https://" + product.image} />}
                >
                    <Button onClick={() => deleteProductCar(product._id)} type="primary" shape="round"> Eliminar </Button>
                    <p>{product.description}</p>
                    <p> $  {product.price}</p>
                    <p> Cantidad: {product.quantity}</p>
                    <p> Total:  {product.total}</p>
                    <script>{total = total + product.total}</script>
                </Card>
            </Menu.Item>
        })
        }
        <Menu.Item>
            <p> Subtotal de productos: {total}</p>
            <p> Descuento por marca {car.betterDiscount ? car.betterDiscount.discount : 0}</p>
            <p> Total a pagar $ {car.betterDiscount ? total - car.betterDiscount.discount : 0}</p>
        </Menu.Item>
    </Menu>

    return (
        <div>
            <div className="logo" >
                <img src="https://www.lider.cl/images/logo.svg"/>
            </div>

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">Inicio</Menu.Item>
            </Menu>

            <div className="carrito" >
                <Dropdown overlay={menu} onClick={() => getShoppingCar(setCar)} trigger={['click']}>
                    <img src="https://img.icons8.com/carbon-copy/2x/ffffff/shopping-cart-promotion.png"/>
                </Dropdown>

            </div>
        </div>
    )
}

export async function getShoppingCar(setCar){
    const carId = getCookie(nameCookie);
    if (carId !== '') {
        try {
            const response = await axios.get('http://localhost:3000/cars/' + carId)
            setCar(response.data);
        } catch (e) {
            console.error("error getting products", e);
        }
    }
}

async function deleteProductCar(product){
    const carId = getCookie(nameCookie);
    if (carId !== '') {
        try {
            const body = { "products" : product };
            await axios.put('http://localhost:3000/cars/delete_product/' + carId, body);
        } catch (e) {
            console.error("error delete product ", e);
        }
    }
}

export default Navigation;
