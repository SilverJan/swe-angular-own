import {Component, Input} from 'angular2/core';
import {IArticle} from '../util/article';
import {isStringNullOrEmpty, isObjectNullOrEmptyOrNaN} from '../util/utils';
import {ArticleAdminService} from '../services/article.admin.service';

@Component({
    selector: 'article-add',
    template: `
        <div class="container-fluid">
            <div *ngIf="errorMessage" class="alert alert-danger">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                Fehler: {{errorMessage}}
            </div>
            <div *ngIf="postSuccess" class="alert alert-success">
                <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                {{postSuccessText}}
            </div>
        
            <!--Search form-->
            <div class="col-sm-12">
                <form>
                  <fieldset class="form-group" [disabled]="editDisabled">
                    <label>Version</label>
                    <input type="number" class="form-control" [(ngModel)]="versionInput" placeholder="z.B. 1">
                  </fieldset>
                  <!-- Show ID only if set (initially it is never set; must be done in other component)-->
                  <fieldset class="form-group" disabled *ngIf="idInput">
                    <label>ID</label>
                    <input type="text" class="form-control" [(ngModel)]="idInput">
                  </fieldset>
                  <fieldset class="form-group" [disabled]="editDisabled">
                    <label>Bezeichnung</label>
                    <input type="text" class="form-control" [(ngModel)]="bezeichnungInput" placeholder="z.B. Tisch 'Oval'">
                  </fieldset>
                  <fieldset class="form-group" [disabled]="editDisabled">
                    <label>Preis</label>
                    <input type="number" min="0" step="any" class="form-control" [(ngModel)]="preisInput" placeholder="z.B. 10.99">
                  </fieldset>
                  <fieldset class="form-group" [disabled]="editDisabled">
                    <label>Kategorie</label>
                    <input type="text" class="form-control" [(ngModel)]="kategorieInput" placeholder="z.B. WOHNZIMMER">
                  </fieldset>
                  <fieldset class="form-group" [disabled]="editDisabled">
                    <label>Rating</label>
                    <input type="number" min="1" max="5" class="form-control" [(ngModel)]="ratingInput" placeholder="z.B. 4">
                  </fieldset>
                  <fieldset class="form-group" [disabled]="editDisabled">
                    <label>Ausgesondert</label>
                    <input type="checkbox" class="form-control" [(ngModel)]="ausgesondertInput" placeholder="z.B. ">
                  </fieldset>
                  <button type="submit" *ngIf="submitActionText" [disabled]="editDisabled" class="btn btn-default" 
                  (click)="onClickAdd()">{{submitActionText}}</button>
                </form>
            </div>
        </div>
    `
})
export class ArticleAddComponent {
    @Input() private versionInput: number;
    @Input() private idInput: string;
    @Input() private bezeichnungInput: string;
    @Input() private preisInput: number;
    @Input() private kategorieInput: string;
    @Input() private ratingInput: number;
    @Input() private ausgesondertInput: boolean = false;

    @Input() private editDisabled: boolean = false;
    @Input() private selectionMode: ArticleAddSelection = ArticleAddSelection.Add;
    
    @Input() private submitActionText: string = 'Hinzufügen';
    @Input() private postSuccessText: string = 'Datensatz wurde erfolgreich erstellt!';

    private errorMessage: string;
    private postSuccess: boolean;

    constructor(private _articleAdminService: ArticleAdminService) {
    }

    private onClickAdd() {
        this.postSuccess = null;
        this.errorMessage = null;
        if (isStringNullOrEmpty([this.bezeichnungInput, this.kategorieInput])
            || isObjectNullOrEmptyOrNaN(
                [this.versionInput, this.preisInput, this.ratingInput])) {
            this.errorMessage = "Nicht alle Felder ausgefüllt!";
            return;
        }
        if (this.versionInput < 0 || this.preisInput < 0 || this.ratingInput < 0 || this.ratingInput > 5) {
            this.errorMessage = "Nicht alle Felder korrekt ausgefüllt!";
            return;
        }

        let article = <IArticle>{};
        article.version = this.versionInput;
        article.bezeichnung = this.bezeichnungInput;
        article.preis = this.preisInput;
        article.kategorie = this.kategorieInput;
        article.rating = this.ratingInput;
        article.ausgesondert = this.ausgesondertInput;

        if (this.selectionMode === ArticleAddSelection.Add) {
            this.postArticle(article);
        } else {
            article.id = this.idInput;
            this.updateArticle(article);
        }

    }

    private postArticle(article: IArticle) {
        this._articleAdminService.postArticle(article)
            .subscribe(
                message => this.postSuccess = true,
                error => this.errorMessage = "Felder wurden nicht korrekt ausgefüllt!"
            );
    }

    private updateArticle(article: IArticle) {
        this._articleAdminService.updateArticle(article)
            .subscribe(
                message => this.postSuccess = true,
                error => this.errorMessage = "Felder wurden nicht korrekt ausgefüllt!"
            );
    }
}

export enum ArticleAddSelection {
    Add,
    Update
}
