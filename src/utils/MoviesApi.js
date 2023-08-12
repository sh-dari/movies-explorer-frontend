import { movieApiLink } from './constants';

class MoviesApi {
  constructor({baseUrl, headers}) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getFetchAnswer(result) {
    if (result.ok) {
      return result.json()
    }
    return Promise.reject(`Ошибка: ${result.status}`)
  }

  _request(endpoint, options) {
    return fetch(`${this.baseUrl + endpoint}`, options).then(res => this.getFetchAnswer(res))
  }

  getMovies() {
    return this._request('/beatfilm-movies',
    {
      headers: this.headers
    })
  }
}

const moviesApi = new MoviesApi({
  baseUrl: movieApiLink,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default moviesApi;
