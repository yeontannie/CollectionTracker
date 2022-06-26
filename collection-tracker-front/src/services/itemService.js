import axios from "axios"

const URL = "https://localhost:7064/api/Items/"

export default class collectionService {
    static getByCollection(id){
        return axios.get(URL + "get-items", {
            params: {
              id: id
            }
          })
    }

    static getAll(){
      return axios.get(URL + "get-all-items")
    }
} 