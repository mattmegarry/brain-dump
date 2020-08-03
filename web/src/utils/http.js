export const openRequest = (path, method, body) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(body)
  };

  return fetch("http://localhost:4000" + path, options)
    .then(async res => {
      const result = {};
      result.status = res.status;
      result.data = await res.json();
      return result;
    })
    .catch(err => console.log("Error:", err));
};

export const authRequest = (path, method, body) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`
    },
    credentials: "include",
    body: JSON.stringify(body)
  };

  return fetch("http://localhost:4000" + path, options)
    .then(async res => {
      const result = {};
      result.status = res.status;
      result.data = await res.json();

      if (res.status === 401) {
        localStorage.removeItem("token");
      }

      return result;
    })
    .catch(err => console.log("Error:", err));
};
