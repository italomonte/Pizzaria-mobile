import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://localhost:3333'
    baseURL: 'https://pizzaria-backend-orpin.vercel.app/'

})

export {api}