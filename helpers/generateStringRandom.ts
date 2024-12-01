export const generateStringRandom=(length:number):string=>{
    const characters:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result:string = "";


    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
}
export const randomDigit=(length:number):string=>{
    const numbers:string="0123456789";

    let result:string=""
    for(let i=0; i<length; i++){
        result+= numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
}