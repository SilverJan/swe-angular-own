import {Component} from 'angular2/core';
/**
 * Created by Jan on 25.05.2016.
 */

@Component({
    template: `
    <div>
        <h2>Das ist die Artikelverwaltung!</h2>
    </div>
    <div>
        <!--<nav>-->
            <!--<a [routerLink]="['Dev']" (click)="onSelectDev()" >Dev</a>-->
        <!--</nav>-->
    </div>
    <div>
        <router-outlet></router-outlet>
    </div>
    `
})
export class ArticleAdministrationComponent {
}
