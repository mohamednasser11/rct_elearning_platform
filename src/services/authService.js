import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/login/`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    if (response?.data?.access_token) {
      Cookies.set("refresh_token", response?.data?.access_token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set(
        "auth_user_id", response?.data?.user?.id,
        {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        }
      );

      isAuthenticated();
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

const logout = async () => {
  try {
    const token = Cookies.get("refresh_token");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/logout/`,
      {},
      {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      }
    );

    if (response) {
      Cookies.remove("refresh_token");
      isAuthenticated();
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout Failed");
  }
};

const isAuthenticated = () => {
  const getAccessToken = Cookies.get("refresh_token");

  if (!getAccessToken) {
    // console.log(`>>>>>> accessToken ==> ${getAccessToken}`)
    return false; // No token found unAuthorized
  }

  try {
    const decoded = jwtDecode(getAccessToken);

    // Check if the token is expired
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.error("Token has expired");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return false;
  }
};

export default {
  login,
  logout,
  isAuthenticated,
};
