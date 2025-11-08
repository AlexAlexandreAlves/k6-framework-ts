import RequestRestBase from "../../core/request-rest-base.ts";
import { IAuthorCreate } from "../../interface/IAuthors.ts";

const url = __ENV.BASE_URL;

var template = open('../../json-objects/authors/post-authors.json');

export default class PostAuthor extends RequestRestBase {

     constructor() {
        super();
        this.url = url; 
        this.requestService = `/api/v1/Authors`;
        this.setMethod('POST');
        this.tag = 'PostAuthor';
    }

      setJsonBodyFromTemplate(params: IAuthorCreate): void {
            this.jsonBody = JSON.stringify({
                idBook: params.idBook,
                firstName: params.firstName,
                lastName: params.lastName
            });
        }
}