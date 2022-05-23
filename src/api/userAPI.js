const backendURL = "https://cse316final.herokuapp.com";
// const backendURL = "";
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
// export const registerAPI = (name, email, password) => {
//   return fetch(`/api/register`, {
//     ...defaultHeaders,
//     method: "POST",
//     body: JSON.stringify({
//       name: name,
//       email: email,
//       password: password,
//     }),
//   })
//     .then(checkStatus)
//     .then(parseJSON);
// };
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
      return true;
    } else {
      return false;
    }
  });
};

// export const loginAPI = (email, password) => {
//   return fetch(`/api/login`, {
//     ...defaultHeaders,
//     method: "POST",
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   }).then(checkStatus);
//   // .then(parseJSON);
// };

// POST: /logout
export const logoutAPI = () => {
  return fetch(`${backendURL}/api/logout`, {
    ...defaultHeaders,
    method: "POST",
  }).then(checkStatus);
};

// GET: /user
export const getUserAPI = async () => {
  return await fetch(`${backendURL}/api/user`, {
    ...defaultHeaders,
  })
    .then(checkStatus)
    .then(parseJSON);
};

// PUT: /user
export const updateUserAPI = (user) => {
  return fetch(`${backendURL}/api/user`, {
    ...defaultHeaders,
    method: "PUT",
    body: JSON.stringify(user),
  }).then(checkStatus);
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
  console.log(response);
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
