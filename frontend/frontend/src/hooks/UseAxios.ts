import axios from 'axios'

export const UseAxios = () => {
    const api = axios.create({
        baseURL: 'http://localhost:3777/',
    })
    
    return {api}
}