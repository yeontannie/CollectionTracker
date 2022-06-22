import React from "react"
//import "antd/dist/antd.css";
import Navbar from "./pages/Navbar.js"
import Navigation from "./pages/Navigation.js"
import { Layout } from 'antd';
import { BrowserRouter } from "react-router-dom";

const { Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Navbar />

          <Content className="main-content">
            <Navigation />
          </Content>

          <Footer className="footer">
            Collection Tracker @2022 Created by Room50 Inc.
          </Footer>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
