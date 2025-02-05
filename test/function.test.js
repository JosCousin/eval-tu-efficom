const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");

// isEven

test("si j'entre 2, alors je devris avoir true",() =>{
    expect(isEven(2)).toBe(true);
});

test("Si j'entre 3, alors je devris avoir false",() =>{
    expect(isEven(3)).toBe(false);
});

test("si j'entre un caractère, alors je devris avoir une erreur",() =>{
    expect(() => isEven("a")).toThrow("Input must be a number");
});

test("si je rentre un 0, alors je devrais avoir true",() =>{    
    expect(isEven(0)).toBe(true);
});

test("si je rentre un -2, alors je devrais avoir true",() =>{    
    expect(isEven(-2)).toBe(true);
});