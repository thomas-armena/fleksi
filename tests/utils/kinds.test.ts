import Kinds, { KindDefinitionMap } from '../../src/utils/kinds';
import { ThingObject } from '../../src/utils/types';

describe('kinds', () => {
    it('createTemplate', () => {
        const kindDefinitionMap: KindDefinitionMap = {
            "person": {
                name: "string",
                age: "number"
            }
        }
        const kinds = new Kinds(kindDefinitionMap);
        const personTemplate = kinds.createTemplate("person") as ThingObject; 
        expect(personTemplate._kind).toBe('person');
        expect(personTemplate.name).toBe('');
        expect(personTemplate.age).toBe(0);
    });
});