export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("token") || "{}");
  if (user) {
    return { headers: { Authorization: `${user}` } };
  } else {
    return {};
  }
};
