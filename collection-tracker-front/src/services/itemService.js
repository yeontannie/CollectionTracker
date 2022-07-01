import axios from "axios"

const URL = "https://localhost:7064/api/Items/"

export default class itemService {
    static getByCollection(id){
      return axios.get(URL + "get-items", {
          params: {
            id: id
          }
        }
      )
    }

    static getAll(){
      return axios.get(URL + "get-all-items")
    }

    static createItem(model){
      return axios.post(URL + "create-item", model)
    }

    static editItem(model, id){
      return axios.put(URL + "edit-item", model, {
        params: {
          id: id
        }
      })
    }

    static deleteItem(id){
      return axios.delete(URL + "delete-item", {
        params: {
          id: id
        }
      })
    }
} 