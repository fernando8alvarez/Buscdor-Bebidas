//PONER PRIMERA LETRA EN MAYUSCULAS DE UNA ORACION
export const toUpperString = (frase) => {
    const primeraLetra = frase.slice(0, 1).toUpperCase(); //Obtener la priemra letra de la frase y pasarla a mayuscula
    const restoFrase = frase.slice(1); //Obtener el resto de la frase sin la primera letra
    return primeraLetra + restoFrase;
};