import { createContext,useState } from "react";
import { set } from "react-hook-form";

export const ContextStore = createContext(null)

const ContextStoreProvider = (props) => {

      const url = "http://localhost:3000"
      const [loading, setLoading] = useState(true)
      const [token,setToken] = useState("")


      const contextValue = {
        loading,
        setLoading,
        url,
        token,
        setToken
    }

    return (
        <ContextStore.Provider value={contextValue}>
            {props.children}
        </ContextStore.Provider>
    )

}

export default ContextStoreProvider;