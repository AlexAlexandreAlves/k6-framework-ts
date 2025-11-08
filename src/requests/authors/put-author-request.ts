import RequestRestBase from "../../core/request-rest-base.ts";
import { IAuthorUpdate } from "../../interface/IAuthors.ts";

const url = __ENV.BASE_URL;

var template = open('../../json-objects/authors/put-authors.json');

export default class UpdateAuthors extends RequestRestBase {

    constructor(id: string) {
        super();
        this.url = url;
        this.requestService = `/api/v1/Authors/${id}`;
        this.setMethod('PUT');
        this.tag = 'UpdateAuthors';
    }

    setJsonBodyFromTemplate(params: IAuthorUpdate): void {
        this.jsonBody = JSON.stringify({
            firstName: params.firstName,
            lastName: params.lastName
        });
    }
}