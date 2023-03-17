import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

export const loginUser = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data.token
}