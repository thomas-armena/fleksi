import { ComponentLibrary } from '../../src/utils/componentLib';
import Kinds, { KindDefinitionMap } from '../../src/utils/kinds';
import { ThingObject } from '../../src/utils/types';
// import testComponentLib from './testComponentLib';

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

    // it('createTemplate', () => {
    //     const componentLib: ComponentLibrary = testComponentLib;
    //     const kinds = new Kinds();
    //     kinds.addComponentLibrary(componentLib);

    //     console.log(kinds.kindDefinitions);
    //     const testComponent1Template = kinds.createTemplate("TestComponent1");
    //     const testComponent2Template = kinds.createTemplate("TestCompoment2")
    // });
});