export interface IAuthor {
    id?: number;
    idBook?: number;
    firstName: string;
    lastName: string;
}

export interface IAuthorResponse extends IAuthor {
    id: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IAuthorCreate {
    idBook: number;
    firstName: string;
    lastName: string;
}

export interface IAuthorUpdate {
    firstName?: string;
    lastName?: string;
}

export interface IAuthorBook {
    id: number;
    idBook: number;
}

export interface IAuthorSearch {
    firstName?: string;
    lastName?: string;
}
