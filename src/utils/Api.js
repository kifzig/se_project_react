// const baseUrl = "https://my-json-server.typicode.com/kifzig/se_project_react";
const baseUrl = "http://localhost:3001";

export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Get all items
export const getClothingItems = () => {
  const clothingApi = fetch(`${baseUrl}/items`).then(processServerResponse);
  return clothingApi;
};

// Delete an item
export const deleteClothingItem = (id) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
};

// Add an item
export const addClothingItem = (clothingName, imageLoc, weatherType, owner) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/`, {
    method: "POST",
    body: JSON.stringify({
      name: clothingName,
      imageUrl: imageLoc,
      weather: weatherType,
      owner: owner,
    }),
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
};
