import "./Navigation.css";
import {Card, Dropdown, Menu} from "antd";
import {useState} from "react";
import axios from "axios";
import {getCookie,nameCookie} from "../../utils/cookie";

function Navigation() {
    const [car, setCar] = useState([])
    const menu =  <Menu  className="menu">
        <Menu.Item>Resumen</Menu.Item>
        {car && car.products && car.products.map((currentCar) => {
            return  <Menu.Item>
                <Card
                    hoverable
                    style={{width: 300}}
                    cover={<img src={"https://" + currentCar.image} />}
                >
                    <p>{currentCar.description}</p>
                    <p>{"$" + currentCar.price}</p>
                </Card>
            </Menu.Item>
        })
        }
        <Menu.Item>
            {"Total a pagar $"}
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

async function deleteProductCar(product, setCar){
    const carId = getCookie(nameCookie);
    if (carId !== '') {
        try {
            debugger
            const body = { products : [product] };
            const response = await axios.get('http://localhost:3000/cars/delete_product/' + carId, body);
            setCar(response.data);
        } catch (e) {
            console.error("error getting products", e);
        }
    }
}

export default Navigation;
