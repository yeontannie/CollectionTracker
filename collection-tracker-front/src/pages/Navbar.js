import React from "react"
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd"

const { Header } = Layout;
export default function BaseLayout(){
    return(
        <div>
            <Layout>
                <Header className="header">
                    <Menu defaultSelectedKeys={3} className="nav">
                        <Menu.Item key="1"><Link to="/" className="nav-item">Home</Link></Menu.Item> 
                        <div className="auth">
                            { localStorage.getItem("userData") ? <>
                            <Menu.Item key="4"><Link to="/logout" className="nav-item" id="logout-link">Logout</Link></Menu.Item>
                            </> : <>
                            <Menu.Item key="3"><Link to="/login" className="nav-item">Login</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/register" className="nav-item" id="register-link">Register</Link></Menu.Item>
                            </> }
                        </div> 
                    </Menu>  
                </Header>  
            </Layout>
        </div>
    )
}