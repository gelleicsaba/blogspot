import axios from 'axios'

const hostUrl = "http://localhost:8080"

class ArticleService {

    public async getArticles() {
        return (await axios.get(`${hostUrl}/article`)).data
    }
    public async getRandomArticle() {
        return (await axios.get(`${hostUrl}/article/random`)).data
    }
    public async getLatestArticle() {
        return (await axios.get(`${hostUrl}/article/latest`)).data
    }
    public async pageArticle(page: number) {
        return (await axios.get(`${hostUrl}/article/page?page=${page}`)).data
    }
    public async limitDesc(limit: number) {
        return (await axios.get(`${hostUrl}/article/limit?limit=${limit}`)).data
    }
    public async searchArticle(search: string, page: number) {
        return (await axios.get(`${hostUrl}/article/search?page=${page}&search=${encodeURI(search)}`)).data
    }

}

export default new ArticleService()