import componentLib, { ComponentLibrary } from "./componentLib";
import { ThingObject, Thing } from "./types";

const IGNORED_ATTRIBUTES = ['_id', '_isRoot'];

export const KIND = {
    FILE: 'file'
};

export interface TemplateMap {
    [key: string]: ThingObject
}

export type KindValue = string | KindDefinitionMap

export interface KindDefinitionMap {
    [key: string]: KindValue
}

class Kinds {

    public kindDefinitions: KindDefinitionMap;

    constructor(kindDefinitions: KindDefinitionMap = {}) {
        this.kindDefinitions = kindDefinitions;
    }

    addKindDefinitions(kindDefinitions: KindDefinitionMap): void {
        this.kindDefinitions = { ...kindDefinitions };
    }

    addComponentLibrary(componentLibrary: ComponentLibrary): void {
        const componentKindDefinitions = {};
        for (const componentName of Object.keys(componentLibrary)) {
            const component = componentLibrary[componentName];
            const argumentsDefinitions: KindDefinitionMap = {};
            for (const propName of Object.keys(component.propTypes)) {
                const propTypeInfo = component.propTypes[propName].info;
                argumentsDefinitions[propName] = propTypeInfo.propTypeName;
            }
            componentKindDefinitions[componentName] = {
                _arguments: argumentsDefinitions
            };
        }
        this.kindDefinitions = { ...componentKindDefinitions };
        console.log(this.kindDefinitions);
    }

    validate(thingObject: ThingObject): boolean { // TODO: Fix this thing
        const kindDefinition = this.kindDefinitions[thingObject._kind];
        if (!kindDefinition) {
            console.error("!kindDefintion", kindDefinition);
            return false
        }
        for (const key of Object.keys(thingObject)) {
            if (IGNORED_ATTRIBUTES.includes(key)) continue;
            const definition = kindDefinition[key];
            const child = thingObject[key];
            if (typeof child === 'object') {
                const childThingObject = child as ThingObject;
                if (childThingObject._kind != definition) {
                    console.error(childThingObject._kind, "!=",definition);
                    return false;
                }
                if (!this.validate(childThingObject)) {
                    console.error("invalid: ", childThingObject);
                    return false;
                }
            } else {
                if (typeof child !== definition) {
                    console.error(child, "!=",definition);
                    return false;
                }
            }
        }
        return true;
    }

    createTemplate(kind: KindValue): Thing {
        if (typeof kind === 'string') {
            if (kind === 'string') return '';
            if (kind === 'number') return 0;
            if (kind === 'boolean') return false;
            if (kind === 'node') return null;
            const kindDefinition = this.kindDefinitions[kind];
            const thingObject: ThingObject = {_kind: kind};
            for (const key of Object.keys(kindDefinition)) {
                const definition = kindDefinition[key];
                thingObject[key] = this.createTemplate(definition);
            }
            return thingObject as Thing;
        } else {
            const kindMap = kind as KindDefinitionMap;
            const template = {}
            for (const key of Object.keys(kindMap)) {
                template[key] = this.createTemplate(kindMap[key]);
            }
            return template;
        }
    }

    createAllTemplates(): TemplateMap {
        const templates: TemplateMap = {};
        for (const kindName of Object.keys(this.kindDefinitions)){
            templates[kindName] = this.createTemplate(kindName) as ThingObject;
        }
        return templates;
    }


}

export default Kinds;

