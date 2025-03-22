import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const signUp = async (email, password, username, firstname, lastname) => {
  try {
    const payload = {
      email,
      password,
      username,
      first_name: firstname,
      last_name: lastname,
      is_student: true,
    };

    for (const [key, value] of Object.entries(payload)) {
      if(value === "" || !value) {
        throw new Error('Please Fill the missing fields');
      }
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/register/`,
      payload
    );

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      for (const [key, value] of Object.entries(error?.response?.data)) {
        console.log(`>>>> ${key} => ${value}`);
        throw new Error(`${key} => ${value}` || "Signup failed");
      }
    } else {
      throw new Error(error?.response?.message || error.message || "Signup failed");
    }
  }
};

const login = async (email, password) => {
  try {
    const payload = {
      email: email,
      password: password,
    };

    for (const [key, value] of Object.entries(payload)) {
      if(value === "" || !value) {
        throw new Error('Please Fill the missing fields');
      }
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/login/`,
      payload,
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

      Cookies.set("auth_user_id", response?.data?.user?.id, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      isAuthenticated();
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || error?.message ||"Login failed");
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
      Cookies.remove("auth_user_id");
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
  signUp,
  login,
  logout,
  isAuthenticated,
};
