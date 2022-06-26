import React from "react"
import Form from "../components/EmailForm.js"
import authService from "../services/authService.js"

export default function Login(){
    const [loginData, setLoginData] = React.useState({
        email: "",
        password: ""
    })

    function loginUser(event){
        event.preventDefault();
        authService.login(loginData)
            .then(response => {
                console.log(response.data)
                localStorage.setItem("userData", JSON.stringify(response.data))
                localStorage.setItem("username", JSON.stringify(response.data.userName))
                handleSubmit()
            })
            .catch(error => {
                console.log(error)
            }
        )
    }

    async function handleSubmit() {     
        try {
            window.location.href = '/';            
        } catch (e) {
          console.log(e.message);
        }
    }

    function handleChange(event, name){
        setLoginData(oldData => {
            return {
                ...oldData,
                [name]: event.target.value
            }
        })
    }

    return(
        <div className="login">
            <Form 
                handleChange={handleChange}
                email={loginData.email}
                password={loginData.password}
                userSubmit={loginUser}
                btnText="Login"
            />
        </div>
    )
}