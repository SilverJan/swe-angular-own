import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {host, port, NOT_FOUND} from '../util/constants';
import {Observable} from 'rxjs/Observable';
import {IArticle} from '../util/article';

@Injectable()
export class ArticleSearchService {
    private _catalogueUri = `https://${host}:${port}/shop/rest/katalog`;
    private _articleIdUri = this._catalogueUri + '/';

    constructor(private _http: Http) {}

    getAllArticles(description?: string): Observable<IArticle[]> {
        if (description) {
            return this._http.get(this._catalogueUri + '?bezeichnung=' + description)
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            return this._http.get(this._catalogueUri).map(this.extractData).catch(this.handleError);
        }
    }

    getArticle(id: string): Observable<IArticle> {
        let idUri = this._articleIdUri + id;
        return this._http.get(idUri).map(this.extractData).catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        if (error.status === 404) {
            return Observable.throw(NOT_FOUND);
        } else {
            let errMsg = error.message || 'Server error';
            console.error('An error occurred: ' + errMsg);
            return Observable.throw(errMsg);
        }
    }
}