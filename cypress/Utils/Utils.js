import { nanoid } from "nanoid";

export class Utils {

    //Helper method to return 10 Symbols UUID as a String 
    getRandomUUIDString() {
        return nanoid(10)
    }
    //Helper method to return random digit from 0 to maxValue
    getRandomNumber(maxValue) {
        return Math.floor(Math.random() * Math.floor(maxValue));
    }
    //Returns an integer random number between min (included) and max (included)
    getRandomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}