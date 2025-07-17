import BitToChar from "../main/utils/BitToChar.js";

describe('BitToChar Test', () => {
    let charArray;

    beforeEach(() => {
        charArray = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZbcdfghjklmpqrstuvwxyz034568@^$&-*(#/%_']
    });

    test('has 64 chars', () => {
        expect(BitToChar.size()).toBe(64);
    });

    test('Correct int to char mapping', ()=>{
        for(let i = 0; i<64; ++i){
            expect(BitToChar.get(i)).toBe(charArray[i]);
        }
    });

    test('Correct char to int mapping', ()=>{
        charArray.forEach((char, i) =>{
            expect(BitToChar.indexOf(char)).toBe(i);
        });
    });
});