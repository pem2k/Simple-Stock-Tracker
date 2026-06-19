import { logoutUser } from "./api.js";

const logout = document.querySelector("#logout");

if (logout) {
  logout.addEventListener("click", async () => {
    try {
      await logoutUser();
      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
    }
  });
}
