import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:6868/api',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})