import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {host, port, LOCALSTORAGE_AUTH} from '../util/constants';
import {Observable} from 'rxjs/Observable';
import {IArticle} from '../util/article';
import {isStringNullOrEmpty} from '../util/utils';

@Injectable()
export class ArticleAdminService {
    private _articleUri = `https://${host}:${port}/shop/rest/artikel`;

    constructor(private _http: Http) {}

    postArticle(article: IArticle): Observable<void> {
        let body = JSON.stringify(article);
        let baseAuth = localStorage.getItem(LOCALSTORAGE_AUTH);
        if (isStringNullOrEmpty([baseAuth])) {
            throw Error('Localstorage is empty! Why?');
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('authorization', `Basic ${baseAuth}`);
        let options = new RequestOptions({headers: headers});
        return this._http.post(this._articleUri, body, options).map(this.extractData).catch(this.handleError);
    }

    updateArticle(article: IArticle): Observable<void> {
        let body = JSON.stringify(article);
        let baseAuth = localStorage.getItem(LOCALSTORAGE_AUTH);
        if (isStringNullOrEmpty([baseAuth])) {
            throw Error('Localstorage is empty! Why?');
        }
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // headers.append('Access-Control-Allow-Origin', 'https://localhost:8000');
        headers.append('authorization', `Basic ${baseAuth}`);
        let options = new RequestOptions({headers: headers});
        return this._http.put(this._articleUri, body, options).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
    }

    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error('An error occurred: ' + errMsg);
        return Observable.throw(errMsg);
    }
}