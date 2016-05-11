/**
 * Created by Jan on 28.03.2016.
 */
import {Component, provide} from 'angular2/core';
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
    template: `
    <div>
        <h1>Welcome to our shop!</h1>
    </div>
    <div>
        <!--<nav>-->
            <!--<a [routerLink]="['Dev']" (click)="onSelectDev()" >Dev</a>-->
        <!--</nav>-->
    </div>
    <div>
        <router-outlet></router-outlet>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy})],
    selector: 'app'
})
// @RouteConfig([
//     {
//         path: '/dev/...',
//         name: 'Dev',
//         component: DevComponent
//     }
// ])
export class AppComponent {
}
