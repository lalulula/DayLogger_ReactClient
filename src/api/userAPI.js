// const backendURL =
//   process.env.NODE_ENV === "production"
//     ? "https://cse316final.herokuapp.com"
//     : "http://localhost:5001";
// const backendURL =  "https://cse316final.herokuapp.com";
const backendURL = "";
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
    // withCredentials: true,
    // "Access-Control-Allow-Origin": backendURL,
  },
};

// POST: /register
export const registerAPI = async (name, email, password) => {
  return await fetch(`${backendURL}/api/register`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then((response) => {
    if (response.status >= 500) {
      return "duplicated";
    }
    return "sucess";
  });
};

// POST: /login
export const loginAPI = (email, password) => {
  return fetch(`${backendURL}/api/login`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      if (response.status === 204) {
        return false;
      } else {
        return response.json();
      }
    } else {
      return false;
    }
  });
};

// POST: /logout
export const logoutAPI = () => {
  return fetch(`${backendURL}/api/logout`, {
    ...defaultHeaders,
    method: "POST",
  }).then(checkStatus);
};

// GET: /user
export const getUserAPI = () => {
  return fetch(`${backendURL}/api/user`, {
    ...defaultHeaders,
  })
    .then(checkStatus)
    .then((response) => {
      if (response.status === 204) {
        return false;
      } else {
        return response.json();
      }
    });
};

// GET: /users
export const getUsersAPI = () => {
  return fetch(`${backendURL}/api/users`, {
    ...defaultHeaders,
  }).then((response) => {
    if (response.status >= 400) {
      return null;
    } else {
      return parseJSON(response);
    }
  });
};

// PUT: /user
export const updateUserAPI = (user) => {
  return fetch(`${backendURL}/api/user`, {
    ...defaultHeaders,
    method: "PUT",
    body: JSON.stringify(user),
  }).then(checkStatus);
};

//DELETE: /api/user/${userId}
export const deleteUserByIdAPI = (userId) => {
  return fetch(`${backendURL}/api/user/${userId}`, {
    ...defaultHeaders,
    method: "DELETE",
  })
    .then(checkStatus)
    .then(parseJSON);
};

export const uploadImageToCloudinaryAPIMethod = (formData) => {
  //NOTE: test용으로 그냥 클라우드네임 넣어둔교!!!
  // const cloudName = "haeunpark"; // TODO: Write in your own Cloudinary account
  const cloudName = "yunahkim"; // TODO: Write in your own Cloudinary account
  return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    // We do NOT want to set the default headers – the formData will automatically set the
    // headers to tell the server of the data type (which is different than the JSON
    // standard all the other API calls have been sending
    method: "POST",
    body: formData,
  })
    .then(checkStatus)
    .then(parseJSON);
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}
