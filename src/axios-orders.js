import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://hejusburgers.firebaseio.com/'
})

export default instance