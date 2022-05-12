export default class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers }).then(
      this._checkResponse
    );
  }

  getProfileData() {
    return fetch(`${this._url}/users/me`, { headers: this._headers }).then(
      this._checkResponse
    );
  }

  editProfileData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  editAvatarPicture(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  removeCard(dataId) {
    return fetch(`${this._url}/cards/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editCard(dataId) {
    return fetch(`${this.url}/${dataId}`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  addLike(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike(dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getAllData () {
    return Promise.all([this.getProfileData(), this.getAllCards()])
  }
}


