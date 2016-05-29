/**
 * Created by Jan on 28.03.2016.
 */
import {Component, provide, OnInit} from 'angular2/core';
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy,
    RouteConfig
} from 'angular2/router';
import {ArticleAdminComponent} from './article.admin.component';
import {ArticleSearchComponent} from './article.search.component';
import {LoginService} from '../services/login.service';
import {NOT_ALLOWED, LOCALSTORAGE_AUTH} from '../util/constants';
import {encodeBase64} from '../util/utils';
import {ArticleSearchService} from '../services/article.search.service';
import {ArticleAdminService} from '../services/article.admin.service';

@Component({
    templateUrl: 'appComponent.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, ArticleSearchService, ArticleAdminService,
        provide(LocationStrategy, {useClass: HashLocationStrategy})],
    selector: 'app'
})
@RouteConfig([
    {
        path: '/articleadmin/...',
        name: 'ArticleAdmin',
        component: ArticleAdminComponent
    },
    {
        path: '/articlesearch',
        name: 'ArticleSearch',
        component: ArticleSearchComponent,
        useAsDefault: true
    }
])
export class AppComponent {
    private userName: string;
    private password: string;
    public loggedIn: boolean = false;
    private loginFailure: boolean = false;

    constructor(private _loginService: LoginService) {
        // Remove value from local storage when app (page) is loaded the first time
        localStorage.removeItem(LOCALSTORAGE_AUTH);
    }

    private onClickLogout(): void {
        this.loggedIn = false;
        localStorage.removeItem(LOCALSTORAGE_AUTH);
        this._loginService.changeLogin(false);
    }

    private onClickLogin(): void {
        this.loginFailure = false;
        this.login(this.userName, this.password);
    }

    private login(userName: string, password: string): void {
        this._loginService.testLogin(userName, password)
            .subscribe(() => {
                    this.loggedIn = true;
                    let baseAuth = encodeBase64(userName + ':' + password).trim();
                    localStorage.setItem(LOCALSTORAGE_AUTH, baseAuth);
                    this._loginService.changeLogin(true);
                },
                (err: any) => {
                    if (err === NOT_ALLOWED) {
                        this.loginFailure = true;
                        this.loggedIn = false;
                    }
                }
            );
    }

}
