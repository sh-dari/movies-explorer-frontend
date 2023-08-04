import { mainApiLink } from './constants';

class MainApi {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getFetchAnswer(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`)
  }

  _request(endpoint, options) {
    return fetch(`${this.baseUrl + endpoint}`, options).then(res => this.getFetchAnswer(res))
  }

  getSavedMovies() {
    return this._request(`/movies`,
    {
      headers: this.headers,
      credentials: 'include'
    })
  }

  getUserInfo() {
    return this._request(`/users/me`,
    {
      headers: this.headers,
      credentials: 'include'
    })
  }

  updateUserInfo(formData) {
    return this._request(`/users/me`,
    {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(formData),
      credentials: 'include'
    })
  }

  addNewMovie(movieData) {
    return this._request(`/movies`,
    {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(movieData),
      credentials: 'include'
    })
  }

  deleteMovie(id) {
    return this._request(`/movies/${id}`,
    {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include'
    })
  }

  register(password, email, name) {
    return this._request(`/signup`,
    {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({password, email, name}),
      credentials: 'include'
    })
  }

  authorize(password, email) {
    return this._request(`/signin`,
    {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({password, email}),
      credentials: 'include'
    })
  };

  logout() {
    return this._request(`/signout`,
    {
      method: 'POST',
      headers: this.headers,
      credentials: 'include'
    })
  }

  getDataToLoadPage() {
    return Promise.all([this.getUserInfo(), this.getSavedMovies()])
  }
}

const mainApi = new MainApi({
  baseUrl: mainApiLink,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default mainApi;
