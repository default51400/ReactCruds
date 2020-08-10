import axios from "axios";

const baseUrl = "https://localhost:44356/api/"

export default{
    candidate(url = baseUrl + 'candidates'){
        return{
            fetchAll: () => axios.get(url),
            fetchById:id => axios.get(url+id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}