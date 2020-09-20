  import FilmsModel from "../models/FilmsModel";
  import CommentsModel from "../models/CommentsModel";

  const Method = {
    GET: `GET`,
    POST: `POST`
  };

  const SuccessHTTPStatusRange = {
    MIN: 200,
    MAX: 299
  };

  export default class Api {
    constructor(endPoint, authorization) {
      this._endPoint = endPoint;
      this._authorization = authorization;
    }

    getFilms() {
      return this._load({url: `movies`})
        .then(Api.toJSON)
        .then((films) => films.map(FilmsModel.adaptToClient));
    }

    getComments(filmID) {
      return this._load({url: `comments/${filmID}`})
        .then(Api.toJSON)
        .then((films) => films.map(CommentsModel.adaptToClient));
    }

    addComment(comment, id) {
      return this._load({
        url: `comments/${id}`,
        method: Method.POST,
        body: JSON.stringify(CommentsModel.adaptToServer(comment)),
        headers: new Headers({"Content-Type": `application/json`})
      })
        .then(Api.toJSON)
        .then((film) => {
          console.log(film.comments.slice(-1));
         return  CommentsModel.adaptToClient(film.comments.slice(-1)[0])
        });
    }

    _load({
      url,
      method = Method.GET,
      body = null,
      headers = new Headers()
    }) {
      headers.append(`Authorization`, this._authorization);

      return fetch(
          `${this._endPoint}/${url}`,
          {method, body, headers}
      )
        .then(Api.checkStatus)
        .catch(Api.catchError);
    }

    static checkStatus(response) {
      if (
        response.status < SuccessHTTPStatusRange.MIN &&
        response.status > SuccessHTTPStatusRange.MAX
      ) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      return response;
    }

    static toJSON(response) {
      return response.json();
    }

    static catchError(err) {
      throw err;
    }
  }
