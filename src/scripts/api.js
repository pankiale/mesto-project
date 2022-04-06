const config = {
  url: "https://nomoreparties.co/v1/plus-cohort-8",
  headers: {
    Authorization: "18049393-07e7-4f78-bc3d-d0e524a4d71d",
    "Content-type": "application/json",
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export function getAllCards() {
  return fetch(`${config.url}/cards`, { headers: config.headers }).then(
    checkResponse
  );
}

export function getProfileData() {
  return fetch(`${config.url}/users/me`, { headers: config.headers }).then(
    checkResponse
  );
}

export function editProfileData(data) {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function editAvatarPicture(data) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function addCard(data) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function removeCard(dataId) {
  return fetch(`${config.url}/cards/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export function editCard(dataId) {
  return fetch(`${config.url}/${dataId}`, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function addLike(dataId) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export function removeLike(dataId) {
  return fetch(`${config.url}/cards/likes/${dataId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}
