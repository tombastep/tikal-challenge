export type Maybe<T> = T | undefined;

export interface Characters {
    info: Maybe<Info>;
    results: Maybe<Array<Maybe<Character>>>;
}

export interface Episodes {
    info: Maybe<Info>;
    results: Maybe<Array<Maybe<Episode>>>;
}

export interface Locations {
    info: Maybe<Info>;
    results: Maybe<Array<Maybe<Location>>>;
}

export interface Info {
    count: Maybe<number>;
    pages: Maybe<number>;
    next: Maybe<string>;
    prev: Maybe<string>;
}
export interface Character {
    id: Maybe<number>;
    name: Maybe<string>;
    status: Maybe<Status>;
    species: Maybe<Species>;
    type: Maybe<string>;
    gender: Maybe<Gender>;
    origin: Maybe<Location>;
    location: Maybe<Location>;
    image: Maybe<string>;
    episode: Maybe<string[]>;
    url: Maybe<string>;
    created: Maybe<Date>;
}
export interface Episode {
    id?: Maybe<number>;
    name: Maybe<string>;
    air_date: Maybe<string>;
    episode: Maybe<string>;
    characters: Maybe<string[]>;
    url: Maybe<string>;
    created: Maybe<Date>;
}

export interface Location {
    name: Maybe<string>;
    url: Maybe<string>;
    id?: Maybe<number>;
    type?: Maybe<string>;
    dimension?: Maybe<string>;
    residents?: Maybe<string[]>;
    created?: Maybe<Date>;
}

export enum Gender {
    Female = 'Female',
    Male = 'Male',
    Unknown = 'unknown',
}

export enum Species {
    Alien = 'Alien',
    Human = 'Human',
}

export enum Status {
    Alive = 'Alive',
    Dead = 'Dead',
    Unknown = 'unknown',
}
