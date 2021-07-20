import './App.css';
import Store from "./components/store/store.component";

import Layout, {Content, Footer, Header} from "antd/lib/layout/layout";
import Navigation from "./components/Navigation/Navigation";

function App() {

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

export default App;
