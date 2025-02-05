const {isEven,calculateTotalPrice,processPurchase,sendNotification,generatePassword} = require("./../src/function.js");

describe('On vérifie si un nombre est paire ou impaire', () => {
    test("si j'entre un chiffre pair, alors je devrais avoir true", () => {
        expect(isEven(2)).toBe(true);
        expect(isEven(0)).toBe(true);
        expect(isEven(-2)).toBe(true);
    });

    test("Si j'entre un chiffre impaire, alors je devris avoir false", () => {
        expect(isEven(3)).toBe(false);
        expect(isEven(-3)).toBe(false);
    });

    test("si j'entre un caractère, alors je devrais avoir une erreur", () => {
        expect(() => isEven("a")).toThrow("Input must be a number");
    });
});

describe('On calcul le prix total', () => {
    test('Le panier n\'est pas une liste', () => {
        expect(() => calculateTotalPrice(12, 2).toThrowError('Prices must be an array'));
    });

  test("Le panier est une liste qui ne contient pas que des nombres positifs", () => {
    expect(() =>
      calculateTotalPrice([15, 12, "13"], "4").toThrowError(
        "Each price must be a non-negative number"
      )
    );
    expect(() =>
      calculateTotalPrice([15, 12, -13], "4").toThrowError(
        "Each price must be a non-negative number"
      )
    );
    expect(() =>
      calculateTotalPrice([15, 12, "13"], "4").toThrowError(
        "Each price must be a non-negative number"
      )
    );
    expect(() =>
      calculateTotalPrice([15, 12, -13], "4").toThrowError(
        "Each price must be a non-negative number"
      )
    );
  });

  test("La taxe n'est pas un nombre", () => {
    expect(() =>
      calculateTotalPrice([15, 12, 13], "4").toThrowError(
        "Tax rate must be a number"
      )
    );
    expect(() =>
      calculateTotalPrice([15, 12, 13], "4").toThrowError(
        "Tax rate must be a number"
      )
    );
  });

    test('Le prix est correct', () => {
        expect(() => calculateTotalPrice([15, 12, 13], 2).toEquals(120));
    });
});

describe('On envoie une notification', () => {
    test("Si j'entre un string, alors je devrais avoir une notification", () => {
        console.log = jest.fn();
        sendNotification("test");
        expect(console.log).toHaveBeenCalledWith("Notification envoyée : test");
    });
});

describe('On achète le panier', () => {
    test('Le prix est calculé et une notification est envoyé', () => {
        const calculateTotalPrice = jest.fn();
        const sendNotification = jest.fn();

        expect(() => processPurchase([15, 12, 13], 2).toBeCalled(calculateTotalPrice));
        expect(() => processPurchase([15, 12, 13], 2).toBeCalled(sendNotification));
    });

    test('Le panier n\'est pas une liste', () => {
        expect(() => processPurchase(12, 2).toThrowError('Prices must be an array'));
    });

    test('Le panier est une liste qui ne contient pas que des nombres positifs', () => {
        expect(() => processPurchase([15, 12, '13'], '4').toThrowError('Each price must be a non-negative number'));
        expect(() => processPurchase([15, 12, -13], '4').toThrowError('Each price must be a non-negative number'));
    });

    test('La taxe n\'est pas un nombre', () => {
        expect(() => processPurchase([15, 12, 13], '4').toThrowError('Tax rate must be a number'));
    });

    test('Le prix total et le prix d\'achat est le même', () => {
        expect(() => processPurchase([15, 12, 13], '4').toEquals(calculateTotalPrice([15, 12, 13], '4')))
    });
});

describe('On génère un mot de passe', () => {
    test("La longueur est un nombre positif supérieur à 5", () => {
        expect(() => generatePassword(-1)).toThrowError('Length must be a number greater than or equal to 6');
        expect(() => generatePassword(5)).toThrowError('Length must be a number greater than or equal to 6');
        expect(() => generatePassword('1')).toThrowError('Length must be a number greater than or equal to 6');
    });

    test("Si je rentre 6, alors je devrais avoir un mot de passe de 6 caractères", () => {
        expect(generatePassword(6)).toHaveLength(6);
    });

    test("Si je rentre 6 avec l'option uppercase, alors je devrais avoir un mot de passe de 6 caractères qui peut avoir une majuscule", () => {
        expect(generatePassword(6, { uppercase: true })).toMatch(/[A-Za-z]/);
    });

    test("Si je rentre 6 avec l'option numbers, alors je devrais avoir un mot de passe de 6 caractères qui peut avoir un chiffre", () => {
        expect(generatePassword(6, { numbers: true })).toMatch(/[a-z0-9]/);
    });

    test("Si je rentre 6 avec l'option specialChars, alors je devrais avoir un mot de passe de 6 caractères qui peut avoir un caractère spécial", () => {
        expect(generatePassword(6, { specialChars: true })).toMatch(/[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\a-z]/);
    });

    test("Si je rentre 6 avec l'option uppercase, numbers, specialChars, alors je devrais avoir un mot de passe de 6 caractères qui peut avoir une majuscule, un chiffre et un caractère spécial", () => {
        expect(generatePassword(6, { uppercase: true, numbers: true, specialChars: true })).toMatch(/[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\a-zA-Z]/);
    });

    test("Si je rentre 6 avec l'option uppercase, numbers, alors je devrais avoir un mot de passe de 6 caractères qui peut avoir une majuscule et un chiffre", () => {
        expect(generatePassword(6, { uppercase: true, numbers: true })).toMatch(/[A-Za-z0-9]/);
    });

    test("Si je rentre 6 avec l'option uppercase, specialChars, alors je devrais avoir un mot de passe de 6 caractères qui peut avoir une majuscule et un caractère spécial", () => {
        expect(generatePassword(6, { uppercase: true, specialChars: true })).toMatch(/[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\a-zA-Z]/);
    });

    test("Si je rentre 6 avec l'option numbers, specialChars, alors je devrais avoir un mot de passe de 6 caractères qui peut avoir un chiffre et un caractère spécial", () => {
        expect(generatePassword(6, { numbers: true, specialChars: true })).toMatch(/[!@#$% ^&*()\-+={}[\]:;"'<>,.?\/ |\\a-z]/);
    });
});
