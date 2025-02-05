const { isEven, calculateTotalPrice, processPurchase, sendNotification, generatePassword } = require("./../src/function.js");

describe('On calcul le prix total', () => {
    test('Le panier n\'est pas une liste', () => {
        expect(() => calculateTotalPrice(12, 2).toThrowError('Prices must be an array'));
    });

    test('Le panier est une liste qui ne contient pas que des nombres positifs', () => {
        expect(() => calculateTotalPrice([15,12,'13'],'4').toThrowError('Each price must be a non-negative number'));
        expect(() => calculateTotalPrice([15,12,-13],'4').toThrowError('Each price must be a non-negative number'));
    });

    test('La taxe n\'est pas un nombre', () => {
        expect(() => calculateTotalPrice([15,12,13],'4').toThrowError('Tax rate must be a number'));
    });

    test('Le prix est correct', () => {
        expect(() => calculateTotalPrice([15,12,13],2).toEquals(120));
    });
});

describe('On achète le panier', () => {
    test('Le panier n\'est pas une liste', () => {
        expect(() => processPurchase(12, 2).toThrowError('Prices must be an array'));
    });

    test('Le panier est une liste qui ne contient pas que des nombres positifs', () => {
        expect(() => processPurchase([15,12,'13'],'4').toThrowError('Each price must be a non-negative number'));
        expect(() => processPurchase([15,12,-13],'4').toThrowError('Each price must be a non-negative number'));
    });

    test('La taxe n\'est pas un nombre', () => {
        expect(() => processPurchase([15,12,13],'4').toThrowError('Tax rate must be a number'));
    });

    test('Le prix total et le prix d\'achat est le même', () => {
        expect(() => processPurchase([15,12,13],'4').toEquals(calculateTotalPrice([15,12,13],'4')))
    });
});