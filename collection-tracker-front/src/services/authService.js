import axios from "axios"

const URL = "https://localhost:7064/api/Auth/"

export default class authService {
    static login(model){
        return axios.post(URL + "login", model)
    }

    static register(model){
        return axios.post(URL + "register", model)
    }
}