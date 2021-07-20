import './App.css';
import Store from "./components/store/store.component";

import Layout, {Content, Footer, Header} from "antd/lib/layout/layout";
import Navigation from "./components/Navigation/Navigation";
import {getCookie, nameCookie, setCookie} from "./utils/cookie";
import axios from "axios";

function App() {

    createShoppingCar()
      return (
        <div className="App">
            <Layout>
                <Header>
                    <Navigation />
                </Header>
                <Content>
                    <Store />
                </Content>
                <Footer>
                </Footer>
            </Layout>
        </div>
      );
}

async function createShoppingCar(){
    const valueCookie = getCookie(nameCookie)

    if (!valueCookie || valueCookie === '' ){
        try {
            const response = await axios.post('http://localhost:3000/cars')
            if (response && response.data && response.data._id !== ''){
                setCookie(nameCookie, response.data._id);
            }
        } catch (e) {
            console.error("Cannot create shopping car", e);
        }
    }
}

export default App;
