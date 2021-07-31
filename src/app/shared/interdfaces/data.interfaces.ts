export interface APIResponse<T>{
    results: T;
}

export interface DataResponse {
    characters: APIResponse<Characters[]>;
    episode: APIResponse<Episode[]>;
}

export interface Episode {
    name: string;
    episode: string;
}

export interface Characters {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    isFavorite?: boolean;
}