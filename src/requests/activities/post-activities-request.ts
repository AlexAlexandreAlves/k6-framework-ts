import RequestRestBase from "../../core/request-rest-base.ts";
import { IActivitiesCreate } from "../../interface/IActivities.ts";

const url = __ENV.BASE_URL;

var template = open('../../json-objects/activities/post-activities.json');

export default class PostActivities extends RequestRestBase {

    constructor() {
        super();
        this.url = url;
        this.requestService = `/api/v1/Activities`;
        this.setMethod('POST');
        this.tag = 'PostActivities';
    }

    setJsonBodyFromTemplate(params: IActivitiesCreate): void {
        this.jsonBody = JSON.stringify({
            title: params.title,
            dueDate: params.dueDate,
            completed: params.completed
        });
    }
}