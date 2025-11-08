import RequestRestBase from "../../core/request-rest-base.ts";

const url = __ENV.BASE_URL;

export default class GetBookByAuthorId extends RequestRestBase {

     constructor(bookId: string) {
        super();
        this.url = url;
        this.requestService = `/api/v1/Authors/authors/books/${bookId}`;
        this.setMethod('GET');
        this.tag = 'GetBookByAuthorId';
    }
}