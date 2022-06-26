import axios from "axios"

const URL = "https://localhost:7064/api/Collection/"

export default class collectionService {
    static getAll(){
        return axios.get(URL + "get-all-collections")
    }

    static getMyCollections(username){
      return axios.get(URL + "get-my-collections", 
      {
          params: {
            username: username
          }
      })
    }

    static createCollection(model){
      return axios.post(URL + "create-collection", model)
    }

    static getById(id){
      return axios.get(URL + "get-by-id", {
        params: {
          id: id
        }
      })
    }

    static deleteCollection(id){
      return axios.delete(URL + "delete-collection", {
        params: {
          id: id
        }
      })
    }

    static editCollection(model, id){
      return axios.put(URL + "edit-collection", model, {
        params: {
          id: id
        }
      })
    }
}