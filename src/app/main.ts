/**
 * Created by Jan on 11.05.2016.
 */

import {AppComponent} from './components/app.component';
import {bootstrap} from 'angular2/platform/browser';
import 'rxjs/Rx';
import {LoginService} from './services/login.service';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(AppComponent, [LoginService, HTTP_PROVIDERS]);
