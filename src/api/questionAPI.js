// const backendURL =
//   process.env.NODE_ENV === "production"
//     ? "https://cse316final.herokuapp.com"
//     : "http://localhost:5001";
const backendURL = "";
// const backendURL = "https://cse316final.herokuapp.com";
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
    // withCredentials: true,
    // "Access-Control-Allow-Origin": backendURL,
  },
};

//GET: /questions
export const getQuestionAPI = () => {
  return fetch(`${backendURL}/api/questions`, {
    ...defaultHeaders,
  })
    .then(checkStatus)
    .then(parseJSON);
};

//GET: /questions/:id

// POST: /questions
export const createQuestionAPI = (question) => {
  // console.log(question);
  return fetch(`${backendURL}/api/questions`, {
    //${backendURL}/api/notes`로 post 요청 날리는거임
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify(question),
  })
    .then(checkStatus)
    .then(parseJSON);
};

// const getCircularReplacer = () => {
//   const seen = new WeakSet();
//   return (key, value) => {
//     if (typeof value === 'object' && value !== null) {
//       if (seen.has(value)) {
//         return;
//       }
//       seen.add(value);
//     }
//     return value;
//   };
// };

// PUT:updating question : /questions/:id
export const updateQuestionAPI = (question) => {
  return fetch(`${backendURL}/api/questions/${question._id}`, {
    ...defaultHeaders,
    method: "PUT",
    // body: JSON.stringify(question, getCircularReplacer()),
    body: JSON.stringify(question),
  }).then(checkStatus);
};

//DELETE: /questions/:id
export const deleteQuestionAPI = (id) => {
  return fetch(`${backendURL}/api/questions/${id}`, {
    ...defaultHeaders,
    method: "DELETE",
  })
    .then(checkStatus)
    .then(parseJSON);
};

function checkStatus(response) {
  // console.log(response);
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
  // console.log(response);
  return response.json(); //response중에 json 응답만 걸러준다.
}
