
export interface ThingObject {
    _kind?: string,
    _arguments?: ThingObject,
    _children?: ThingObject[],
    _isRoot?: boolean,
    [key: string]: Thing,
}

export interface ThingConfig {
    thing: Thing,
    rootThing: Thing,
    authorMode: boolean,
    url: string,
    path: string[],
    relativePath: string[]
}

export type Thing = ThingObject | string | number | boolean | Thing[];

