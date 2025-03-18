import axios from "axios";
import Cookies from "js-cookie";
import jwt, { verify } from "jsonwebtoken";

const BASE_URL = "http://localhost:8000";
const login = async (email, password, rememberMe) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/users/login/`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    console.log(`>>>>> response ${JSON.stringify(response)}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const isAuthenticated = () => {
    let isAuthenticated = false;
    const getAccessToken = Cookies.get("token");
    if(getAccessToken) {
        //TODO:: add the jwt verify callback to check if the token is still valid
        jwt.verify()
    }
  return getAccessToken ? true : false;
};

export default {
  login,
  isAuthenticated
};
