import React from "react"
import Form from "../components/EmailForm.js"
import authService from "../services/authService.js"

export default function Register(){
    const [registerData, setRegisterData] = React.useState({
        email: "",
        password: "",
        confirmation: ""
    })

    function registerUser(event){
        event.preventDefault()
        if(registerData.password === registerData.confirmation){
            authService.register(registerData)
                .then(response => {
                    console.log(response)
                    handleSubmit()
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            alert("passwords doesn't match")
        }
    }

    async function handleSubmit() {     
        try {
            window.location.href = '/login';            
        } catch (e) {
          console.log(e.message);
        }
    }

    function handleChange(event, name){
        setRegisterData(oldData => {
            return {
                ...oldData,
                [name]: event.target.value
            }
        })
    }

    return(
        <div className="register">
        <Form 
            handleChange={handleChange}
            email={registerData.email}
            password={registerData.password}
            confirmation={registerData.confirmation}
            userSubmit={registerUser}
            btnText="Register"
        />
    </div>
    )
}