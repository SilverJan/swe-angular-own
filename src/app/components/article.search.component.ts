import {Component} from 'angular2/core';
import {IArticle, articleMockA, articleMockB} from '../util/article';
import {ArticleSearchService} from '../services/article.search.service';
import {isStringNullOrEmpty} from '../util/utils';
import {NOT_FOUND} from '../util/constants';
/**
 * Created by Jan on 25.05.2016.
 */
@Component({
    template: `<div class="container-fluid">
        <!--Search form-->
        <div class="col-sm-4">
            <form class="form-inline">
              <fieldset class="form-group">
                <label for="formGroupExampleInput">Suchbegriff</label>
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
            <h3>Artikeldetails</h3>
            <dl class="dl-horizontal">
              <dt class="col-sm-3">Version</dt>
              <dd class="col-sm-9">{{selectedArticle.version}}</dd>
              <dt class="col-sm-3">ID</dt>
              <dd class="col-sm-9">{{selectedArticle.id}}</dd>
              <dt class="col-sm-3">Bezeichnung</dt>
              <dd class="col-sm-9">{{selectedArticle.bezeichnung}}</dd>
              <dt class="col-sm-3">Preis</dt>
              <dd class="col-sm-9">{{selectedArticle.preis}}€</dd>
              <dt class="col-sm-3">Kategorie</dt>
              <dd class="col-sm-9">{{selectedArticle.kategorie}}</dd>
              <dt class="col-sm-3">Rating</dt>
              <dd class="col-sm-9">{{selectedArticle.rating}}</dd>
              <dt class="col-sm-3">Ausgesondert</dt>
              <dd class="col-sm-9">{{selectedArticle.ausgesondert}}</dd>
            </dl>
        </div>
    </div>
    `,
    providers: [ArticleSearchService]
})
export class ArticleSearchComponent {
    public searchInput: string;
    public foundArticles: IArticle[];
    public selectedArticle: IArticle;
    public noArticlesFound: boolean = false;

    constructor(private _articleSearchService: ArticleSearchService) {
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
        // Do /id request and preview in article detail box
        this.selectedArticle = article;
    }

    private getAllArticles(description?: string): void {
        // Reset situation
        this.foundArticles = [];
        this.noArticlesFound = false;

        this._articleSearchService.getAllArticles(description)
            .subscribe((articles: IArticle[]) => {
                    this.foundArticles = articles;
                },
                (err: any) => {
                    if (err.message === NOT_FOUND || description) {
                        this.noArticlesFound = true;
                    } else {
                        console.log(err);
                    }
                }
            );
    }
}
