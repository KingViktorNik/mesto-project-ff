const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '9a6aeb5f-5827-4768-8d6b-54e318fb40d2'
  }
}

function get(uri) {
  return fetch(config.baseUrl + uri, {
    headers: config.headers
  })
  .then(res => checkServerResponse(res));
} 

function set(uri, data, method = 'POST') {
  const headers = config.headers;
  headers['Content-Type'] = "application/json";
  
  return fetch(config.baseUrl + uri, {
    method,
    headers,
    body: JSON.stringify(data)
    })
    .then(res => checkServerResponse(res));
} 

function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  }

  throw new Error(`Ошибка: ${res.status}`);
}

function checkUrlExists(url) {
  return fetch(url, { method: 'HEAD' })
    .then(res => {
      const status = res.status;
      const contentType = res.headers.get('Content-Type');
      const isSuccessStatus = status >= 200 && status < 300;
      const isImage = contentType && contentType.includes('image/');

      if (res.ok) {
        return {
          status,
          contentType,
          isSuccessStatus,
          isImage
        };
      }

      throw new Error(`Ошибка: ${res.status}`);    
    })
}

export const makeCrudAPI = {
  getProfile: () => get('/users/me/'),
  updateProfile: data => set('/users/me/', data, 'PATCH'),
  updateProfileAvatar: data => set('/users/me/avatar/', data, 'PATCH'),
  getListCard: () => get('/cards/'),
  createCard: data => set('/cards/', data),
  deleteCard: id => set(`/cards/${id}`, {}, 'DELETE'),
  likeCard: id => set(`/cards/likes/${id}`, {}, 'PUT'),
  dislikeCard: id => set(`/cards/likes/${id}`, {}, 'DELETE'),
  checkUrlExists: url => checkUrlExists(url),
};
