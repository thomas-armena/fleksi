
export interface ThingObject {
    _kind?: string,
    _arguments?: ThingObject,
    _children?: ThingObject[],
    _isRoot?: boolean,
    [key: string]: unknown,
}

export interface ThingAppContext {
    rootThing: ThingObject,
    authorMode: boolean,
    path: string[],
}

export interface ThingComponent {
    thing: Thing,
    authorMode: boolean,
    path: PathNodes,
}

export type PathNodes = string[];

export type Thing = ThingObject | string | number | boolean | Thing[];

