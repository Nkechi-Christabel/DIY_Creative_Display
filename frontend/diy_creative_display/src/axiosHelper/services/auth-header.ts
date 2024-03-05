export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user) {
    return { headers: { Authorization: `${user}` } };
  } else {
    return {};
  }
};
