const rewire = require('rewire')
const generateNPCs = rewire('../../generation/generate')


beforeAll(() => {
    require('../../setup/logging')();
});

describe("Generation", () => {
    test("Generate Name Unit Test", async () => {
        generateNames = generateNPCs.__get__('generateNames');
        const names = await generateNames(5);
        expect(names).toHaveLength(5);
        expect(names).not.toContain(null);

        const regional_names = await generateNames(5, 'Korea');
        expect(regional_names).toHaveLength(5);
        expect(regional_names).not.toContain(null);

        const gendered_names = await generateNames(5, '', 'male');
        expect(gendered_names).toHaveLength(5);
        expect(regional_names).not.toContain(null);
        
    });
    test("Generate Traits", () => {
        generateTraits = generateNPCs.__get__('generateTraits');
        const traits = generateTraits(100);
        expect(traits).toHaveLength(100);
        expect(traits).not.toContain(null);
    });
    test("Generate Attributes", () => {
        generateAttributes = generateNPCs.__get__('generateAttributes');
        const attributes = generateAttributes(10);
        expect(attributes).toHaveLength(10);

        const possible_attributes = ['Horrible', 'Below Average', 'Average', 'Above Average', 'Excellent'];
        attributes.forEach((attribute_block) => {
            expect(Object.keys(attribute_block)).toHaveLength(6);
            expect(attribute_block).toHaveProperty("Strength");
            expect(possible_attributes).toContain(attribute_block.Strength);
            expect(attribute_block).toHaveProperty("Dexterity");
            expect(possible_attributes).toContain(attribute_block.Dexterity);
            expect(attribute_block).toHaveProperty("Constitution");
            expect(possible_attributes).toContain(attribute_block.Constitution);
            expect(attribute_block).toHaveProperty("Intelligence");
            expect(possible_attributes).toContain(attribute_block.Intelligence);
            expect(attribute_block).toHaveProperty("Wisdom");
            expect(possible_attributes).toContain(attribute_block.Wisdom);
            expect(attribute_block).toHaveProperty("Charisma");
            expect(possible_attributes).toContain(attribute_block.Charisma);
        });

        const custom_attributes = generateAttributes(10, ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7']);
        custom_attributes.forEach((attribute_block) => {
            expect(Object.keys(attribute_block)).toHaveLength(7);
            expect(attribute_block).toHaveProperty("Test1");
            expect(possible_attributes).toContain(attribute_block.Test1);
            expect(attribute_block).toHaveProperty("Test2");
            expect(possible_attributes).toContain(attribute_block.Test2);
            expect(attribute_block).toHaveProperty("Test3");
            expect(possible_attributes).toContain(attribute_block.Test3);
            expect(attribute_block).toHaveProperty("Test4");
            expect(possible_attributes).toContain(attribute_block.Test4);
            expect(attribute_block).toHaveProperty("Test5");
            expect(possible_attributes).toContain(attribute_block.Test5);
            expect(attribute_block).toHaveProperty("Test6");
            expect(possible_attributes).toContain(attribute_block.Test6);
            expect(attribute_block).toHaveProperty("Test7");
            expect(possible_attributes).toContain(attribute_block.Test7);
        });

    });
    test("Generate Characters", async () => {
        const characters = await generateNPCs.generate(3);
        expect(characters).toHaveLength(3);

        const character_attributes = characters.map((character) => character.attribute);
        const possible_attributes = ['Horrible', 'Below Average', 'Average', 'Above Average', 'Excellent'];
        character_attributes.forEach((attribute_block) => {
            expect(Object.keys(attribute_block)).toHaveLength(6);
            expect(attribute_block).toHaveProperty("Strength");
            expect(possible_attributes).toContain(attribute_block.Strength);
            expect(attribute_block).toHaveProperty("Dexterity");
            expect(possible_attributes).toContain(attribute_block.Dexterity);
            expect(attribute_block).toHaveProperty("Constitution");
            expect(possible_attributes).toContain(attribute_block.Constitution);
            expect(attribute_block).toHaveProperty("Intelligence");
            expect(possible_attributes).toContain(attribute_block.Intelligence);
            expect(attribute_block).toHaveProperty("Wisdom");
            expect(possible_attributes).toContain(attribute_block.Wisdom);
            expect(attribute_block).toHaveProperty("Charisma");
            expect(possible_attributes).toContain(attribute_block.Charisma);
        });

        const character_traits = characters.map((character) => character.traits);
        character_traits.forEach((trait_list) => {
            expect(trait_list).toHaveLength(3);
            trait_list.forEach((trait) => {
                expect(trait).toBeDefined();
            });
        });

        const custom_att_characters = await generateNPCs.generate(3, '', '', ['Test1', 'Test2']);
        const custom_character_attributes = custom_att_characters.map((character) => character.attribute);
        custom_character_attributes.forEach((attribute_block) => {
            expect(Object.keys(attribute_block)).toHaveLength(2);
            expect(attribute_block).toHaveProperty("Test1");
            expect(possible_attributes).toContain(attribute_block.Test1);
            expect(attribute_block).toHaveProperty("Test2");
            expect(possible_attributes).toContain(attribute_block.Test2);
        })
    });

    test("Generate Characters With Custom Names", async () => {
        const characters = await generateNPCs.generateWithCustomNames(3, ["Andy", "Bob", "Carol"]);
        expect(characters).toHaveLength(3);
        expect(characters.map((character) => character.name).sort()).toEqual(["Andy", "Bob", "Carol"]);

        const character_attributes = characters.map((character) => character.attribute);
        const possible_attributes = ['Horrible', 'Below Average', 'Average', 'Above Average', 'Excellent'];
        character_attributes.forEach((attribute_block) => {
            expect(Object.keys(attribute_block)).toHaveLength(6);
            expect(attribute_block).toHaveProperty("Strength");
            expect(possible_attributes).toContain(attribute_block.Strength);
            expect(attribute_block).toHaveProperty("Dexterity");
            expect(possible_attributes).toContain(attribute_block.Dexterity);
            expect(attribute_block).toHaveProperty("Constitution");
            expect(possible_attributes).toContain(attribute_block.Constitution);
            expect(attribute_block).toHaveProperty("Intelligence");
            expect(possible_attributes).toContain(attribute_block.Intelligence);
            expect(attribute_block).toHaveProperty("Wisdom");
            expect(possible_attributes).toContain(attribute_block.Wisdom);
            expect(attribute_block).toHaveProperty("Charisma");
            expect(possible_attributes).toContain(attribute_block.Charisma);
        });

        const character_traits = characters.map((character) => character.traits);
        character_traits.forEach((trait_list) => {
            expect(trait_list).toHaveLength(3);
            trait_list.forEach((trait) => {
                expect(trait).toBeDefined();
            });
        });
    });
});
