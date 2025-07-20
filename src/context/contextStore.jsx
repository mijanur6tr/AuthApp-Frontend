import { createContext,useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ContextStore = createContext(null)


const ContextStoreProvider = (props) => {
    //   const navigate = useNavigate();
      const url = "http://localhost:3000"
      const [loading, setLoading] = useState(true)
      const [token, setToken] = useState(localStorage.getItem("token") || "");
      
const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const userInfo = res.data;

        
        const backendRes = await axios.post(
          "http://localhost:3000/api/user/google-login",
          {
            email: userInfo.email,
            fullName: userInfo.name,
          }
        );

        if (backendRes.data.success) {
          setToken(backendRes.data.token)
          localStorage.setItem("token", backendRes.data.token)
          window.location.href = "/";
        } else {
          toast.error("Error in log in")
        }


      } catch (err) {
        console.error("Google login failed:", err);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

      const contextValue = {
        loading,
        setLoading,
        url,
        token,
        setToken,
        login
        
    }

    return (
        <ContextStore.Provider value={contextValue}>
            {props.children}
        </ContextStore.Provider>
    )

}

export default ContextStoreProvider;