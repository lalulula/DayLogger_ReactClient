// const backendURL = "https://cse316final.herokuapp.com";
const backendURL = "";
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
export const createQuestionAPI = (questionType, questionText) => {
  return fetch(`${backendURL}/api/questions`, {
    //${backendURL}/api/notes`로 post 요청 날리는거임
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify({ questionType, questionText }),
  })
    .then(checkStatus)
    .then(parseJSON);
};

// PUT: /questions/:id
export const updateQuestionAPI = (questions) => {
  return fetch(`${backendURL}/api/questions/${questions?._id}`, {
    ...defaultHeaders,
    method: "PUT",
    body: JSON.stringify(questions),
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
