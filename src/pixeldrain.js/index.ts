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
     * Retrieves file information from the API and returns it as a PixeldrainFile Object
     *
     * @param {string} id File ID
     * @return {*}  {Promise<PixeldrainFile>}
     * @memberof PixelDrain
     */
    public getFile(id: string): Promise<PixeldrainFile> {
        return new Promise<PixeldrainFile>((resolve, reject) => {
            this.pixeldrainService.getFileInfo(id)
                .then((data) => {
                    resolve(new PixeldrainFile(data, this.pixeldrainService))
                })
                .catch(reject)
        })
    }

    /**
     * Uploads a file to pixeldrain. A File can either be uploaded anonymously or under a user account
     *
     * @param {PixeldrainFileUploadOptions} file File Information
     * @return {*}  {Promise<PixeldrainFile>}
     * @memberof PixelDrain
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