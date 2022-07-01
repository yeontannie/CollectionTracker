import React from "react"
import { Routes, Route } from "react-router-dom";

import Home from "./Home.js"
import Collections from "./Collections.js";
import MyCollections from "./MyCollections.js";
import Items from "./Items.js";
import Comments from "./Comments"

import Login from "./Login.js"
import Logout from "./Logout.js";
import Register from "./Register.js"

export default function Navigation(){
    return(
        <div className="site-layout-background">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/my-collections" element={<MyCollections />} />
                <Route path="/items" element={<Items />} />
                <Route path="/item/comments" element={<Comments />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}