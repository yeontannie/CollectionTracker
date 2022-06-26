import React from "react"
import { Link } from "react-router-dom";
import { Layout, Menu, Avatar } from "antd"
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import MenuItem from "antd/lib/menu/MenuItem";

const { Header } = Layout;
export default function BaseLayout(){
    return(
        <div>
            <Layout>
                <Header className="header">
                    <Menu defaultSelectedKeys={3} className="nav">
                        <div className="links">
                        { localStorage.getItem("userData") ? <>
                            <Menu.Item key="1"><Link to="/" className="nav-item">Home</Link></Menu.Item> 
                            <Menu.Item key="2"><Link to="/collections" className="nav-item">Collections</Link></Menu.Item>
                            <Menu.Item key="7"><Link to="/my-collections" className="nav-item">My Collections</Link></Menu.Item>
                            </> : <>
                            <Menu.Item key="1"><Link to="/" className="nav-item">Home</Link></Menu.Item> 
                            <Menu.Item key="2"><Link to="/collections" className="nav-item">Collections</Link></Menu.Item>
                        </>}
                        </div>
                        <div className="auth">
                            { localStorage.getItem("userData") ? <>

                            <MenuItem><Link to="./profile">
                                <Avatar icon={<UserOutlined className="user-icon" />} className="avatar"/>
                            </Link></MenuItem>
                            <Menu.Item>
                            <div className="dropdown">
                                <button className="dropbtn"><DownOutlined /></button>
                                <div className="dropdown-content">
                                    <hr />
                                    <Link to="/logout" className="nav-item">Logout</Link>
                                </div>
                            </div> 
                            </Menu.Item>

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