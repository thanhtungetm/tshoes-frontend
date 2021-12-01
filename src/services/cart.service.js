import http from '../common/http'
import store from '../store'

class CartService {
    constructor(){
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser
            if(user && user.accessToken){
                config.headers.authorization = `Bearer ${user.accessToken}`
            }
            return config
        })
    }
    getAll()                                {return http.get('/cart')}
    add(product)                            {return http.post(`/cart`,product)}
    remove(id)                              {return http.delete(`/cart/${id}`)}
}

export default new CartService()