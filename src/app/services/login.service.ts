import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {host, port, NOT_FOUND, NOT_ALLOWED} from '../util/constants';
import {Observable} from 'rxjs/Observable';
import {IArticle} from '../util/article';
import {encodeBase64} from '../util/utils';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';

@Injectable()
export class LoginService {
    private _loginTestUri: string = `https://${host}:${port}/shop/rest/artikel/ratingStats`;
    private _loggedInSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
    loggedInObservable$  = this._loggedInSource.asObservable();

    constructor(private _http: Http) {
    }

    testLogin(userName: string, password: string): Observable<IArticle[]> {
        let baseAuth = encodeBase64(userName + ':' + password).trim();
        let header = new Headers();
        header.append('authorization', `Basic ${baseAuth}`);
        let options = new RequestOptions({
            headers: header
        });

        return this._http.get(this._loginTestUri, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    changeLogin(newLoginState: boolean) {
        this._loggedInSource.next(newLoginState);
    }

    getLoginState(): boolean {
        return this._loggedInSource.getValue();
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
        } else if (error.status === 401) {
            return Observable.throw(NOT_ALLOWED);
        } else {
            let errMsg = error.message || 'Server error';
            console.error('An error occurred: ' + errMsg + "; code: " + error.status);
            return Observable.throw(errMsg);
        }
    }

}