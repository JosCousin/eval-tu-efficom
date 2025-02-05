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

// sendNotification

test("Si j'entre un string, alors je devrais avoir une notification",() =>{
    console.log = jest.fn();
    sendNotification("test");
    expect(console.log).toHaveBeenCalledWith("Notification envoyée : test");
});

// genereatePassword

test("Si je rentre 6, alors je devrais avoir un mot de passe de 6 caractères",() =>{
    expect(generatePassword(6)).toHaveLength(6);
});

test("Si je rentre 6 avec l'option uppercase, alors je devrais avoir un mot de passe de 6 caractères avec une majuscule",() =>{
    expect(generatePassword(6,{uppercase:true})).toMatch(/[A-Za-z]/);
});

test("Si je rentre 6 avec l'option numbers, alors je devrais avoir un mot de passe de 6 caractères avec un chiffre",() =>{
    expect(generatePassword(6,{numbers:true})).toMatch(/[a-z0-9]/);
});

test("Si je rentre 6 avec l'option specialChars, alors je devrais avoir un mot de passe de 6 caractères avec un caractère spécial",() =>{
    expect(generatePassword(6,{specialChars:true})).toMatch(/[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\a-z]/);
});

test("Si je rentre 6 avec l'option uppercase, numbers, specialChars, alors je devrais avoir un mot de passe de 6 caractères avec une majuscule, un chiffre et un caractère spécial",() =>{
    expect(generatePassword(6,{uppercase:true, numbers:true, specialChars:true})).toMatch(/[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\a-zA-Z]/);
});

test("Si je rentre 6 avec l'option uppercase, numbers, alors je devrais avoir un mot de passe de 6 caractères avec une majuscule et un chiffre",() =>{
    expect(generatePassword(6,{uppercase:true, numbers:true})).toMatch(/[A-Za-z0-9]/);
});

test("Si je rentre 6 avec l'option uppercase, specialChars, alors je devrais avoir un mot de passe de 6 caractères avec une majuscule et un caractère spécial",() =>{
    expect(generatePassword(6,{uppercase:true, specialChars:true})).toMatch(/[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\a-zA-Z]/);
});

test("Si je rentre 6 avec l'option numbers, specialChars, alors je devrais avoir un mot de passe de 6 caractères avec un chiffre et un caractère spécial",() =>{
    expect(generatePassword(6,{numbers:true, specialChars:true})).toMatch(/[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\a-z]/);
});




