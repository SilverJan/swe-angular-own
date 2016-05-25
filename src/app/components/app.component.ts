/**
 * Created by Jan on 28.03.2016.
 */
import {Component, provide} from 'angular2/core';
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy,
    RouteConfig
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ArticleAdministrationComponent} from './article.administration.component';
import {ArticleSearchComponent} from './article.search.component';

@Component({
    template: `
    <nav class="navbar navbar-dark bg-inverse">
      <a class="navbar-brand" >Menü</a>
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['ArticleAdmin']">Artikelverwaltung</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" [routerLink]="['ArticleSearch']">Artikelsuche</a>
        </li>
      </ul>
      <!--<form class="form-inline pull-xs-right">-->
        <!--<input class="form-control" type="text" placeholder="Search">-->
        <!--<button class="btn btn-success-outline" type="submit">Search</button>-->
      <!--</form>-->
    </nav>
    <div>
    <br>
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy})],
    selector: 'app'
})
@RouteConfig([
    {
        path: '/articleadmin',
        name: 'ArticleAdmin',
        component: ArticleAdministrationComponent
    },
    {
        path: '/articlesearch',
        name: 'ArticleSearch',
        component: ArticleSearchComponent,
        useAsDefault: true
    }
])
export class AppComponent {
}
