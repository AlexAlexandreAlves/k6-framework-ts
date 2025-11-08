export interface IActivities {
    id?: number;
    title: string;
    dueDate: string;
    completed: boolean;
}

export interface IActivitiesResponse extends IActivities {
    id: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IActivitiesCreate {
    title: string;
    dueDate: string;
    completed: boolean;
}

export interface IActivitiesUpdate {
    title?: string;
    completed?: boolean;
}
