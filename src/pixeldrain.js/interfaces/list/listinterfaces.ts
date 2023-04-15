export interface List {
    title: string,
    anonymous: boolean,
    dateCreated?:Date,
    
    files: ListItem[]
}

export interface ListItem {
    file: File,
    description: string,
}

