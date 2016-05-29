export interface IArticle {
    version: number;
    id?: string;
    bezeichnung: string;
    preis: number;
    kategorie: string;
    rating: number;
    ausgesondert: boolean;
}

export const articleMockA = <IArticle>{};
articleMockA.version = 1;
articleMockA.id = "123";
articleMockA.bezeichnung = "Tisch Töfte";
articleMockA.preis = 10.50;
articleMockA.kategorie = "Tisch";
articleMockA.rating = 3;
articleMockA.ausgesondert = false;

export const articleMockB = <IArticle>{};
articleMockB.version = 2;
articleMockB.id = "321";
articleMockB.bezeichnung = "Tisch Tim";
articleMockB.preis = 200.30;
articleMockB.kategorie = "Tisch";
articleMockB.rating = 5;
articleMockB.ausgesondert = true;