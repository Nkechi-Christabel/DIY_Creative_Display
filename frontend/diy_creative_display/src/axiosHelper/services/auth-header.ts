export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user && user.token) {
    // for Node.js Express back-end
    return { headers: { Authorization: `Bearer ${user.token}` } };
  } else {
    return {};
  }
};
