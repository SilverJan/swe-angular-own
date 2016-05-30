import {Component, OnInit} from 'angular2/core';
import {IArticle} from '../util/article';
import {ArticleSearchService} from '../services/article.search.service';
import {isStringNullOrEmpty, isObjectNullOrEmptyOrNaN} from '../util/utils';
import {NOT_FOUND} from '../util/constants';
import {ArticleAddComponent, ArticleAddSelection} from './article.admin.add.component';
import {LoginService} from '../services/login.service';
/**
 * Created by Jan on 25.05.2016.
 */
@Component({
    template: `
    <div class="container-fluid">
        <!--Search form-->
        <div class="col-sm-4">
            <form class="form-inline">
              <fieldset class="form-group">
                <label>Suchbegriff</label>
                <input type="text" class="form-control" [(ngModel)]="searchInput" placeholder="z.B. Tisch 'Oval'">
                <button type="submit" class="btn btn-default" (click)="onClickSearch()">Suchen</button>
              </fieldset>
            </form>
        </div>
        
        <!-- Found articles list -->
        <div class="col-sm-4">
            <h3>Gefundene Artikel</h3>
            <div *ngIf="noArticlesFound">
                Es wurden keine Artikel gefunden!
            </div>
            
            <div *ngIf="foundArticles">
                <ul class="list-group">
                  <li class="list-group-item" *ngFor="#foundArticle of foundArticles" (click)="onClickArticleDetails(foundArticle)">
                    <div>
                        <div class="text-left">
                            {{foundArticle.bezeichnung}}
                        </div>
                        <div class="text-right">
                            Preis: {{foundArticle.preis}}€
                        </div>
                    </div>
                  </li>
                </ul>
            </div>
        </div>
        
        <!-- Article detail box -->
        <div class="col-sm-4" *ngIf="selectedArticle">
            <div *ngIf="!loggedIn">
                <h3>Artikeldetails</h3>
                 <article-add [versionInput]=selectedArticle.version
                [idInput]=selectedArticle.id
                [bezeichnungInput]=selectedArticle.bezeichnung
                [preisInput]=selectedArticle.preis
                [kategorieInput]=selectedArticle.kategorie
                [ratingInput]=selectedArticle.rating
                [ausgesondertInput]=selectedArticle.ausgesondert
                
                [submitActionText]=null
                [editDisabled]=true
                ></article-add>
            </div>
            <div *ngIf="loggedIn">
                <h3>Artikeldetails</h3>
                 <article-add [versionInput]=selectedArticle.version
                [idInput]=selectedArticle.id
                [bezeichnungInput]=selectedArticle.bezeichnung
                [preisInput]=selectedArticle.preis
                [kategorieInput]=selectedArticle.kategorie
                [ratingInput]=selectedArticle.rating
                [ausgesondertInput]=selectedArticle.ausgesondert
                
                [submitActionText]=submitActionText
                [postSuccessText]=postSuccessText
                [editDisabled]=!loggedIn
                [selectionMode]=selectionMode
                ></article-add>
            </div>
        </div>
    </div>
    `, directives: [ArticleAddComponent]
})
export class ArticleSearchComponent implements OnInit {
    public searchInput: string;
    public foundArticles: IArticle[];
    public selectedArticle: IArticle;
    public noArticlesFound: boolean = false;
    public loggedIn: boolean = false;

    private submitActionText: string = 'Aktualisieren';
    private postSuccessText: string = 'Datensatz wurde erfolgreich aktualisiert!';
    private selectionMode: ArticleAddSelection = ArticleAddSelection.Update;

    constructor(private _articleSearchService: ArticleSearchService,
                private _loginService: LoginService) {
        // This only works if LoginService is bootstrapped in main.ts -> Why? Dunno!
        _loginService.loggedInObservable$.subscribe((newLoginState: boolean) => {
            this.loggedIn = newLoginState;
        });
    }

    ngOnInit(): any {
        // if loginState is undefined (never set by a service), then it is false. Maybe put this in getLoginState() method
        const loginState = this._loginService.getLoginState();
        this.loggedIn =
            isObjectNullOrEmptyOrNaN([loginState]) === true ? false : loginState;
        return undefined;
    }

    public onClickSearch(): void {
        // Do get all request and preview in found articles list
        if (!isStringNullOrEmpty([this.searchInput])) {
            this.getAllArticles(this.searchInput);
        } else {
            this.getAllArticles();
        }
        this.selectedArticle = null;
    }

    public onClickArticleDetails(article: IArticle): void {
        this.selectedArticle = article;
    }

    private getAllArticles(description?: string): void {
        // Reset situation
        this.foundArticles = [];
        this.noArticlesFound = false;

        this._articleSearchService.getAllArticles(description)
            .subscribe((articles: IArticle[]) => {
                this.foundArticles = articles;
            }, (err: any) => {
                if (err.message === NOT_FOUND || description) {
                    this.noArticlesFound = true;
                } else {
                    console.log(err);
                }
            });
    }
}
