import http from '../common/http'

class SlideService {
    getAll() { return http.get('/slides') }
}

export default new SlideService()