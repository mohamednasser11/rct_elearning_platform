import axios from "axios";
import Cookies from "js-cookie";

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
      if (value === "" || !value) {
        throw new Error("Please Fill the missing fields");
      }
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/register/`,
      payload,
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
      throw new Error(
        error?.response?.message || error.message || "Signup failed",
      );
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
      if (value === "" || !value) {
        throw new Error("Please Fill the missing fields");
      }
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/login/`,
      payload,
      {
        withCredentials: true,
      },
    );

    if (response?.data?.access_token) {
      Cookies.set("refresh_token", response?.data?.access_token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });
    }

    return response?.data?.user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error?.message || "Login failed",
    );
  }
};

const socialLogin = async (provider) => {
  try {
    // Redirect to the appropriate OAuth provider
    const providerUrls = {
      google: `${import.meta.env.VITE_BASE_URL}/api/v1/auth/google/`,
      github: `${import.meta.env.VITE_BASE_URL}/api/v1/auth/github/`,
      twitter: `${import.meta.env.VITE_BASE_URL}/api/v1/auth/twitter/`,
      microsoft: `${import.meta.env.VITE_BASE_URL}/api/v1/auth/microsoft/`,
    };

    if (!providerUrls[provider]) {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    // Open the OAuth provider's authorization URL in a new window
    const authWindow = window.open(
      providerUrls[provider],
      "_blank",
      "width=600,height=600",
    );

    // Listen for messages from the popup window
    return new Promise((resolve, reject) => {
      window.addEventListener("message", async (event) => {
        // Verify origin for security
        if (event.origin !== window.location.origin) return;

        try {
          if (event.data.error) {
            reject(new Error(event.data.error));
            return;
          }

          if (event.data.token) {
            // Save the token and user info
            Cookies.set("refresh_token", event.data.token, {
              expires: 1,
              secure: true,
              sameSite: "Strict",
            });

            resolve(event.data.user || { provider });
          }
        } catch (error) {
          reject(error);
        } finally {
          if (authWindow) {
            authWindow.close();
          }
        }
      });

      // Handle case where user closes the popup
      const checkClosed = setInterval(() => {
        if (authWindow && authWindow.closed) {
          clearInterval(checkClosed);
          reject(new Error("Authentication cancelled"));
        }
      }, 1000);
    });
  } catch (error) {
    throw new Error(error.message || `${provider} login failed`);
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
      },
    );

    if (response) {
      Cookies.remove("refresh_token");
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout Failed");
  }
};

export default {
  signUp,
  login,
  logout,
  socialLogin,
};
