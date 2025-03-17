import axios from "axios"

const BASE_URL = 'http://localhost:8000'
const login = async (email, password, rememberMe)=> {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/users/login/`, {
            email: email,
            password: password
        },
        {
            withCredentials: true, // Send cookies with the request
        });

        console.log(`>>>>> response ${JSON.stringify(response)}`)
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}


export default {
    login
}