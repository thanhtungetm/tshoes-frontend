import http from '../common/http'

class BrandService {
    getAll() { return http.get('/brands') }
}

export default new BrandService()