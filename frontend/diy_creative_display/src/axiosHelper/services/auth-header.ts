<<<<<<< HEAD
export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user) {
    return { headers: { Authorization: `${user}` } };
  } else {
    return {};
  }
};
=======
export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user && user.token) {
    // for Node.js Express back-end
    return { headers: { Authorization: `Bearer ${user.token}` } };
  } else {
    return {};
  }
};
>>>>>>> 9e8d84532f8f420a4b31c3699f3b1dcec1729b4e
