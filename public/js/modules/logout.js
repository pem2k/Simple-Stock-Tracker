const logout = document.querySelector("#logout");

if (logout) {
  logout.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Logout failed.");
      }

      window.location.href = "/";
    } catch (error) {
      console.error(error.message);
    }
  });
}
