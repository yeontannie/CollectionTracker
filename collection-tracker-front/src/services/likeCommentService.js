import axios from "axios"

const URL = "https://localhost:7064/api/LikeComment/"

export default class likeCommentService {
    static getComments(id){
        return axios.get(URL + "get-comments", {
          params: {
            id: id
          }
        })
      }
  
      static addComment(model){
        return axios.post(URL + "add-comment", model)
      }
  
      static likeItem(model, username){
        return axios.put(URL + "like-item", model, {
          params: {
            currentUser: username
          }
        })
      }
}