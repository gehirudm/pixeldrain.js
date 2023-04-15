import { PixeldrainFileInformation } from "../interfaces/file/fileinterfaces";
import { PixeldrainFileUploadOptions } from "../interfaces/file/fileuploadinterfaces";
import { List } from "../interfaces/list/listinterfaces";

import fetch from 'node-fetch';
import * as fs from 'fs';
import * as http from 'http';


export class PixeldrainService {
    APIKey: string;
    readonly BASE_URL = 'https://pixeldrain.com/api';
    private authorizationHeader: any;

    //private readonly authorizationHeader = 

    constructor(APIKey: string = "") {
        this.APIKey = APIKey;
        this.authorizationHeader = this.APIKey == "" ? {} : { "Authorization": "Basic " + Buffer.from(":" + this.APIKey).toString('base64') };
    }

    /**
     * uploadFile
     */
    public uploadFile(file: PixeldrainFileUploadOptions): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let readStream = fs.createReadStream(file.path);

            fetch(`${this.BASE_URL}/file/${file.name}`, {
                method: 'PUT',
                headers: file.anonymous ? undefined : this.authorizationHeader,
                body: readStream
            })
                .then(async (res) => {
                    if (res.status > 400) {
                        let json = await res.json() as { success: boolean, value: string, message: string }
                        reject(new Error(`Error occured whilst uploading file\nFile Name: ${file.name}\n${json.value}\n${json.message}`))
                    }
                    return res.json();
                }).then(function (json: { id: string }) {
                    resolve(json.id)
                })
                .catch(reject)
        })
    }

    /**
     * deleteFile
     */
    public deleteFile(fileID: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fetch(`${this.BASE_URL}/file/${fileID}`, {
                method: 'delete',
                headers: this.authorizationHeader
            })
                .then(async (res) => {
                    if (res.status > 400) {
                        let json = await res.json() as { sucess: boolean, value: string, message: string }
                        reject(new Error(`Error occured whilst deleting a file.\nFile ID : ${fileID}\n${json.value}\n${json.message}`))
                    }
                    resolve()
                })
                .catch(reject)
        })
    }

    /**
     * fileInfo
     */
    public getFileInfo(fileID: string): Promise<PixeldrainFileInformation> {
        return new Promise<PixeldrainFileInformation>((resolve, reject) => {
            fetch(`${this.BASE_URL}/file/${fileID}/info`, {
                method: 'get',
                headers: this.authorizationHeader
            })
                .then(async (res) => {
                    if (res.status > 400) {
                        let json = await res.json() as { sucess: boolean, value: string }

                        reject(new Error(`Error occured whilst obtaining file details. \nFile ID : ${fileID}\n${json.value}`))
                    }
                    return res.json()
                })
                .then((json: PixeldrainFileInformation) => {
                    resolve(json)
                })
                .catch(reject)
        })
    }

    /**
     * downloadFile
     */
    public downloadFile(path: string = "", id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.getFileInfo(id).then((file) => {
                http.get(`${this.BASE_URL}/file/${id}`, function (response) {
                    const writeSteam = fs.createWriteStream(path == "" ? file.name : `${path}/${file.name}`)

                    response.pipe(writeSteam);

                    writeSteam.on("finish", () => {
                        writeSteam.close();
                        resolve()
                    });

                    writeSteam.on("error", reject)
                });
            })
        })
    }

    /**
     * createList
     */
    public createList(list: List): Promise<string> {
        return new Promise<string>((resolve, reject) => {

        })
    }

    /**
     * listInformation
     */
    public getListInformation(listID: string) {

    }
}