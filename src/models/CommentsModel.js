import Observer from "../utils/Observer";
import CONFIG from "../config";
import Api from "../utils/Api";

export default class CommentsModel extends Observer {
    constructor(filmID, comments = []) {
        super();
        this._filmID = filmID;
        this._comments = comments;
        this._api = new Api(CONFIG.END_POINT, CONFIG.AUTHORIZATION);

        this._api.getComments(this._filmID).then((comments) => this.addList(comments));
    }

    getCommentsCount() {
       return this._comments.length;
    }

    getAll() {
        return this._comments;
    }

    getByID(id) {
        return this._comments.filter((comment) => comment.id === id)[0];
    }

    add(data) {
        this._api.addComment(data, this._filmID).then((comment) => {
            this.addList(comment)
            this._notify();
        })
    }

    addList(list) {
        this._comments = this._comments.concat(list);
        this._notify();
    }

    remove(id) {
        this._api.removeComment(id).then((request) => {
            console.log(request);
            this._comments = this._comments.filter((comment) => comment.id !== id);
            this._notify();
        })

    }

    static adaptToClient(data) {
        return {
            id: data.id,
            text: data.comment,
            emoji: data.emotion,
            author: data.author,
            date: data.date,
        }
    }

    static adaptToServer(data) {
        return {
            id: data.id,
            //author: data.author,
            comment: data.text,
            date: data.date,
            emotion: data.emoji,
        }
    }
}
