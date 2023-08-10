const baseUrl = "https://my-json-server.typicode.com/kifzig/se_project_react";

const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getClothingItems = () => {
  const clothingApi = fetch(`${baseUrl}/items`).then(processServerResponse);
  return clothingApi;
};
