export class PixeldrainAPIError extends Error {
    value:string;
    fileID:string;
    
    constructor(message:string, value:string, fileID?:string) {
        super(message);
        this.value = value;
        this.fileID = fileID;
    }

    toString(){
        return this.message + '\n' + this.value + '\n' + this.fileID ? this.fileID : ""
    }
}