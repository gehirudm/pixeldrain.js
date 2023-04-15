import { PixeldrainFile } from "./components/file/file";
import { FileGetInformationError } from "./interfaces/file/fileinterfaces";
import { PixeldrainFileUploadOptions } from "./interfaces/file/fileuploadinterfaces";
import { List } from "./interfaces/list/listinterfaces";
import { PixeldrainService } from "./services/pixeldrainservice";

export class PixelDrain {
    pixeldrainService: PixeldrainService;

    constructor(APIKey: string = "") {
        this.pixeldrainService = new PixeldrainService(APIKey);
    }

    /**
     * getFile
     */
    public getFile(id: string): Promise<File> {
        return new Promise<File>((resolve, reject) => {
            this.pixeldrainService.getFileInfo(id)
                .then((data) => {
                    return new PixeldrainFile(data, this.pixeldrainService)
                })
                .catch(reject)
        })
    }

    /**
     * uploadFile
     */
    public uploadFile(file:PixeldrainFileUploadOptions): Promise<PixeldrainFile> {
        return new Promise<PixeldrainFile>((resolve, reject) => {
            this.pixeldrainService.uploadFile(file)
            .then((id) => this.pixeldrainService.getFileInfo(id))
            .then((fileInfo) => resolve(new PixeldrainFile(fileInfo, this.pixeldrainService)))
            .catch(reject)
        })
    }
}