export interface PixeldrainFileInterface {
    id: string,
    name: string,
    size: number,
    views: number,
    bandwidth_used: number,
    bandwidth_used_paid: number,
    downloads: number,
    date_upload: Date,
    date_last_view: Date,
    mime_type: string,
    thumbnail_href: string,
    hash_sha256: string,
    can_edit: boolean,
    description?: string,
    delete(): Promise<void>,
    download(path: string): Promise<void>,
    downloadThumbnail(path: string): Promise<void>
}

export interface PixeldrainFileInformation {
    id: string,
    name: string,
    size: number,
    views: number,
    bandwidth_used: number,
    bandwidth_used_paid: number,
    downloads: number,
    date_upload: Date,
    date_last_view: Date,
    mime_type: string,
    thumbnail_href: string,
    hash_sha256: string,
    can_edit: boolean,
    description?: string,
}

export interface FileGetInformationError {
    success: boolean,
    value: string,
}