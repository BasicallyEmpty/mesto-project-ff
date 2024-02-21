const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    authorization: '9c0a15bf-0357-41c7-b509-b74fdde8315e',
    'Content-Type': 'application/json'
  }
}

export const requestUserInfo = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers
  })
}

export const requestCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers
  })
}
