import { KindDefinitionMap, TemplateMap } from "./kinds";

export interface ThingObject {
    _kind?: string,
    _arguments?: ThingObject,
    _children?: ThingObject,
    _isRoot?: boolean,
    [key: string]: any,
}

export interface ThingFile {
    _kind?: string,
}

export interface ThingAppContext {
    rootThing: ThingObject,
    authorMode: boolean,
    path: string[],
    kinds: KindDefinitionMap,
    templates: TemplateMap,
}

export interface ThingComponent {
    thing: Thing,
    authorMode: boolean,
    path: PathNodes,
}

export type PathNodes = string[];

export type Thing = ThingObject | ThingFile | string | number | boolean | Thing[];

