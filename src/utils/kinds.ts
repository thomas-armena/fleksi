import { object } from 'prop-types';
import componentLib, { ComponentLibrary } from './componentLib';
import { ThingObject, Thing, ThingComponent } from './types';

const defaultKinds = {
    'file': {},
    'none': {}
}

export const KIND = {
    FILE: 'file',
    NONE: 'none,'
};

export interface TemplateMap {
    [key: string]: ThingObject;
}

export type KindValue = string | KindDefinitionMap;

export interface KindDefinitionMap {
    [key: string]: KindValue;
}

interface PropTypeInfo {
    objectShape?: ObjectShape;
    propTypeName: string;
    isRequired: boolean;
}

interface ObjectShape {
    [key: string]: {
        isRequired: boolean;
        info: PropTypeInfo;
    };
}

class Kinds {
    public kindDefinitions: KindDefinitionMap;

    constructor(kindDefinitions: KindDefinitionMap = {}) {
        this.kindDefinitions = { ...defaultKinds, ...kindDefinitions};
    }

    addKindDefinitions(kindDefinitions: KindDefinitionMap): void {
        this.kindDefinitions = { ...kindDefinitions };
    }

    addComponentLibrary(componentLibrary: ComponentLibrary): void {
        const componentKindDefinitions = {};
        for (const componentName of Object.keys(componentLibrary)) {
            const component = componentLibrary[componentName];
            componentKindDefinitions[componentName] =
                this._getKindDefinitionFromComponent(component);
        }
        this.kindDefinitions = { ...componentKindDefinitions };
    }

    _getKindDefinitionFromComponent(
        component: React.FunctionComponent<{ thingComponent: ThingComponent }>
    ): KindValue {
        const kindDefinition: KindValue = {
            _arguments: {},
        };
        for (const propName of Object.keys(component.propTypes)) {
            if (propName === 'children') {
                kindDefinition._children = 'object';
                continue;
            }
            const propTypeInfo: PropTypeInfo =
                component.propTypes[propName].info;
            kindDefinition._arguments[propName] =
                this._getKindDefinitionFromPropTypeInfo(propTypeInfo);
        }
        return kindDefinition;
    }

    _getKindDefinitionFromPropTypeInfo(propTypeInfo: PropTypeInfo): KindValue {
        const { propTypeName } = propTypeInfo;
        if (propTypeName === 'shape') {
            return this._getKindDefinitionFromShape(propTypeInfo.objectShape);
        } else {
            return propTypeName;
        }
    }

    _getKindDefinitionFromShape(objectShape: ObjectShape): KindValue {
        const kindValue = {};
        for (const key of Object.keys(objectShape)) {
            const propTypeInfo = objectShape[key].info;
            kindValue[key] =
                this._getKindDefinitionFromPropTypeInfo(propTypeInfo);
        }
        return kindValue;
    }

    validate(thingObject: ThingObject): boolean {
        if (typeof thingObject !== 'object') return true;
        const kind = this._getKind(thingObject);
        const kindDefinition = this.kindDefinitions[kind];

        if (kindDefinition === undefined) {
            console.warn(`definition for ${kind} doesn't exist`);
            return false;
        }

        if (!this._thingMatchesDefinition(thingObject, kindDefinition)) {
            console.warn('validation failed for', thingObject);
            return false;
        }

        for (let key of Object.keys(thingObject)) {
            const childThingObject = thingObject[key];
            if (!this.validate(childThingObject)) return false;
        }

        return true;
    }

    _thingMatchesDefinition(
        thing: ThingObject,
        definition: KindValue
    ): boolean {
        const ignoredAttributes = ['_id', '_isRoot', '_key'];
        for (let key of Object.keys(definition)) {
            if (ignoredAttributes.includes(key)) continue;
            if (thing[key] === undefined) {
                console.warn(key, 'is not defined');
                return false;
            }
            if (typeof definition[key] === 'object') {
                if (typeof thing[key] !== 'object') {
                    console.warn(`Should be object: ${thing[key]}`);
                    return false;
                }
                if (
                    !this._thingMatchesDefinition(thing[key], definition[key])
                ) {
                    return false;
                }
            } else if (typeof thing[key] !== definition[key]) {
                console.warn(
                    `kind error, ${typeof thing[key]} !== ${definition[key]}`
                );
                return false;
            }
        }
        return true;
    }

    _getKind(thingObject): string {
        return thingObject._kind || 'none';
    }

    createTemplate(kind: KindValue): Thing {
        if (typeof kind === 'string') {
            if (kind === 'string') return '';
            if (kind === 'number') return 0;
            if (kind === 'boolean') return false;
            if (kind === 'object') return null;
            const kindDefinition = this.kindDefinitions[kind];
            const thingObject: ThingObject = { _kind: kind };
            for (const key of Object.keys(kindDefinition)) {
                const definition = kindDefinition[key];
                thingObject[key] = this.createTemplate(definition);
            }
            return thingObject as Thing;
        } else {
            const kindMap = kind as KindDefinitionMap;
            const template = {};
            for (const key of Object.keys(kindMap)) {
                template[key] = this.createTemplate(kindMap[key]);
            }
            return template;
        }
    }

    createAllTemplates(): TemplateMap {
        const templates: TemplateMap = {};
        for (const kindName of Object.keys(this.kindDefinitions)) {
            templates[kindName] = this.createTemplate(kindName) as ThingObject;
        }
        return templates;
    }
}

export default Kinds;
