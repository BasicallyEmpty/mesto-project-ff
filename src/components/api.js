import { checkResponse } from "./utils"

const request = (url, options) => {
  return fetch(url, options).then(checkResponse)
}

const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    authorization: '9c0a15bf-0357-41c7-b509-b74fdde8315e',
    'Content-Type': 'application/json'
  }
}

const requestUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
}

const requestCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
}

const updateProfile = (name, description) => {
  return request(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
}

const postCard = (name, link) => {
  return request(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}

const removeCard = (cardId) => {
  return request(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
}

const updateAvatar = (link) => {
  return request(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
}

const postLike = (cardId) => {
  return request(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
}

const removeLike = (cardId) => {
  return request(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
}

export { request, requestUserInfo, requestCards, updateProfile, postCard, removeCard, updateAvatar, postLike, removeLike }