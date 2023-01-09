import axios from "axios";
import { persistor } from "..";

const logout = (navigate) => {
  axios.get("/api/auth/logout").then(() => {
    persistor.purge();
    navigate("/home");
  });
};

export { logout };
