import RequestRestBase from "../../core/request-rest-base.ts";
import { IActivitiesUpdate } from "../../interface/IActivities.ts";

const url = __ENV.BASE_URL;

var template = open('../../json-objects/activities/put-activities.json');

export default class UpdateActivities extends RequestRestBase {

    constructor(id: string) {
        super();
        this.url = url;
        this.requestService = `/api/v1/Activities/${id}`;
        this.setMethod('PUT');
        this.tag = 'UpdateActivities';
    }

    setJsonBodyFromTemplate(params: IActivitiesUpdate): void {
        this.jsonBody = JSON.stringify({
            title: params.title,
            completed: params.completed
        });
    }
}