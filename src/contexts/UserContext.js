import { createContext, useState } from "react";
import { deleteToken } from "helpers/auth";
import axiosInstance from "helpers/axios";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cloudinarys, setCloudinarys] = useState([]);

  // async function handleLogout() {
  //   try {
  //     await axiosInstance.get("/users/delete/token/");
  //     deleteToken();
  //     setUser(null);
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const logout = () => {
    deleteToken();
    window.location.href = "/";
  };

  const contextValue = {
    user,
    setUser,
    logout: logout,
    loadingUser,
    setLoadingUser,
    cloudinarys,
    setCloudinarys,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;
