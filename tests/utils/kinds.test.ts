import { ComponentLibrary } from '../../src/utils/componentLib'
import Kinds, { KindDefinitionMap } from '../../src/utils/kinds'
import { ThingObject } from '../../src/utils/types'
import { logFull } from '../../src/utils/logging'

const testKindDefintionMap: KindDefinitionMap = {
    Content: { _arguments: {}, _children: 'object' },
    Hero: { _arguments: { title: 'string' } },
    Heading1: { _arguments: { text: 'string' } },
    Page: { _arguments: {}, _children: 'object' },
    Text: { _arguments: { text: 'string' } },
    Image: { _arguments: { src: 'string' } },
    Person: { _arguments: { person: { name: 'string', age: 'number' } } },
}

const testRootThing = {
    _isRoot: true,
    _arguments: { title: 'Fleksi Demo' },
    _children: {
        hero: {
            _kind: 'Hero',
            _arguments: {
                title: 'Fleksi Starter 2',
                backgroundImage: '/assets/image1.png',
            },
        },
        heading: { _kind: 'Heading1', _arguments: { text: 'Heading' } },
        image: { _kind: 'Image', _arguments: { src: '/assets/image1.png' } },
        text: { _kind: 'Text', _arguments: { text: 'Lorem ipsum' } },
    },
    _kind: 'Page',
    assets: {
        _kind: 'none',
        'image1.png': { _kind: 'file' },
        'image2.png': { _kind: 'file' },
        'pepe.jpeg': { _kind: 'file' },
    },
    someRandomData: { key1: 'value', key2: 1234 },
    subdirs: {
        _kind: 'none',
        page1: {
            _kind: 'Page',
            _arguments: { title: 'Page1' },
            _children: {
                hero: {
                    _kind: 'Hero',
                    _arguments: {
                        title: 'Page One',
                        backgroundImage: '/assets/image1.png',
                    },
                },
                heading: { _kind: 'Heading1', _arguments: { text: 'Heading' } },
                image: {
                    _kind: 'Image',
                    _arguments: { src: '/assets/pepe.jpeg' },
                },
                text: { _kind: 'Text', _arguments: { text: 'Lorem ipsum' } },
            },
        },
        page2: {
            _kind: 'Page',
            _arguments: { title: 'Page2' },
            _children: {
                hero: {
                    _kind: 'Hero',
                    _arguments: {
                        title: 'Page Two',
                        backgroundImage: '/assets/image1.png',
                    },
                },
                heading: { _kind: 'Heading1', _arguments: { text: 'Heading' } },
                image: {
                    _kind: 'Image',
                    _arguments: { src: '/assets/image1.png' },
                },
                text: { _kind: 'Text', _arguments: { text: 'Lorem ipsum' } },
            },
        },
    },
}

describe('kinds', () => {
    it('createTemplate', () => {
        const kinds = new Kinds(testKindDefintionMap)
        const personTemplate = kinds.createTemplate('Person') as ThingObject
        expect(personTemplate._kind).toBe('Person')
        expect(personTemplate._arguments.person.name).toBe('')
        expect(personTemplate._arguments.person.age).toBe(0)

        const pageTemplate = kinds.createTemplate('Page') as ThingObject
        expect(pageTemplate._kind).toBe('Page');
        expect(pageTemplate._children).toBe(null);
    })

    it('validate', () => {
        const kinds = new Kinds(testKindDefintionMap)

        const testObjects: ThingObject[] = [
            testRootThing._children.hero as ThingObject,
            testRootThing._children.heading as ThingObject,
            testRootThing as ThingObject
        ];

        for (let thing of testObjects) {
            expect(kinds.validate(thing)).toBe(true)
        }

        const wrongTestObjects: ThingObject[] = [
            {
                _kind: "Page"
            },
            {
                _kind: "NonExisting"
            }
        ]

        for (let thing of wrongTestObjects) {
            expect(kinds.validate(thing)).toBe(false)
        }
    })
})
