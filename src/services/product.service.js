import http from '../common/http'
import store from '../store'

class ProductService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`
            }
            return config
        })
    }
    getAll()                                    { return http.get('/products') }
    getTotalNumber()                            { return http.get(`/products/count`) }
    getTotalNumberOfBrand(id)                   { return http.get(`/products/count?brand=${id}`) }
    get(id)                                     { return http.get(`/products/${id}`) }
    getAllLike()                                { return http.get(`/products/like`) }
    like(id)                                    { return http.post(`/products/like/${id}`) }
    unlike(id)                                  { return http.delete(`/products/like/${id}`) }
    getPage(page, number = 10)                  { return http.get(`/products/${page}/${number}`) }
    findProduct(name)                           { return http.get(`/products?name=${name}`) }
    findProductOfBrand(id, page, number = 10)   { return http.get(`/products/${page}/${number}?brand=${id}`) }
}

export default new ProductService()