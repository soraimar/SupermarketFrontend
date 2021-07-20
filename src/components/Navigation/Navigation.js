import "./Navigation.css";
import {Card, Dropdown, Menu} from "antd";
import {useState} from "react";

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
                <Dropdown >
                    <img src="https://img.icons8.com/carbon-copy/2x/ffffff/shopping-cart-promotion.png"/>
                </Dropdown>

            </div>
        </div>
    )
}

export default Navigation;
