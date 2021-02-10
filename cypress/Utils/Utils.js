import { nanoid } from "nanoid";

export class Utils {

    //Helper method to return 10 Symbols UUID as a String 
    getRandomUUIDString() {
        return nanoid(10)
    }

}