import { PixeldrainFileInformation, PixeldrainFileInterface } from "../../interfaces/file/fileinterfaces";
import { PixeldrainService } from "../../services/pixeldrainservice";

export class PixeldrainFile implements PixeldrainFileInterface {
    id: string;
    name: string;
    size: number;
    views: number;
    bandwidth_used: number;
    bandwidth_used_paid: number;
    downloads: number;
    date_upload: Date;
    date_last_view: Date;
    mime_type: string;
    thumbnail_href: string;
    hash_sha256: string;
    can_edit: boolean;
    description = "";

    pixeldrainService: PixeldrainService;

    constructor(data: PixeldrainFileInformation, pixeldrainService: PixeldrainService) {
        this.pixeldrainService = pixeldrainService;
        ({
            id: this.id,
            name: this.name,
            size: this.size,
            views: this.views,
            bandwidth_used: this.bandwidth_used,
            bandwidth_used_paid: this.bandwidth_used_paid,
            downloads: this.downloads,
            date_upload: this.date_upload,
            date_last_view: this.date_last_view,
            mime_type: this.mime_type,
            thumbnail_href: this.thumbnail_href,
            hash_sha256: this.hash_sha256,
            can_edit: this.can_edit,
            description: this.description
        } = data)
    }

    delete(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.pixeldrainService.deleteFile(this.id)
            .then(resolve)
            .catch(reject)
        })
    }

    download(path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    downloadThumbnail(path: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}