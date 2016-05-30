import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ArticleAddComponent} from './article.admin.add.component';
/**
 * Created by Jan on 25.05.2016.
 */

@Component({
    template: `
    <nav class="navbar navbar-dark bg-inverse">
        <a class="navbar-brand" >Artikelverwaltung</a>
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link" [routerLink]="['ArticleAdd']">Artikel hinzufügen</a>
            </li>
        </ul>
    </nav>
    <br>
    <div>
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([{path: '/articleAdd', name: 'ArticleAdd', component: ArticleAddComponent, useAsDefault: true}])
export class ArticleAdminComponent {
}