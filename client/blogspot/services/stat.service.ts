import axios from 'axios'

const hostUrl = "http://localhost:8080"

class StatService {

    public async getStat() {
        return (await axios.get(`${hostUrl}/stat`)).data
    }

}

export default new StatService()