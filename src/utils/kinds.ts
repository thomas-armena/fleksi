import { ThingObject, Thing } from "./types";

export const KIND = {
    FILE: 'file'
};

export interface KindDefinition {
    [key: string]: string
}

export interface KindDefinitionMap {
    [key: string]: KindDefinition
}

class Kinds {

    kindDefinitions: KindDefinitionMap;

    constructor(kindDefinitions: KindDefinitionMap = {}) {
        this.kindDefinitions = kindDefinitions;
    }

    validate(thingObject: ThingObject): boolean {
        const kindDefinition = this.kindDefinitions[thingObject._kind];
        if (!kindDefinition) return 
        for (const key of Object.keys(thingObject)) {
            const definition = kindDefinition[key];
            const child = thingObject[key];
            if (typeof child === 'object') {
                const childThingObject = child as ThingObject;
                if (childThingObject._kind != definition) return false;
                if (!this.validate(childThingObject)) return false
            } else {
                if (typeof child !== definition) return false
            }
        }
        return true;
    }

    createTemplate(kind: string): Thing {
        if (kind === 'string') return '';
        if (kind === 'number') return 0;
        if (kind === 'boolean') return false;
        const kindDefinition = this.kindDefinitions[kind];
        const thingObject: ThingObject = {_kind: kind};
        for (const key of Object.keys(kindDefinition)) {
            const definition = kindDefinition[key];
            thingObject[key] = this.createTemplate(definition);
        }
        return thingObject as Thing;
    }


}

export default Kinds

