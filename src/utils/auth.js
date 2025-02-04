import { processServerResponse } from "./Api";

const BASE_URL = "http://localhost:3001";

// Sign Up - Registration
export const signup = (name, avatar, email, password) => {
  return fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(processServerResponse);
};

// Sign In - Log In

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(processServerResponse);
};

//Edit profile
export const editProfile = ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");
  console.log("editProfile");

  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(processServerResponse);
};

// Fetch User Data
export const fetchUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
};
