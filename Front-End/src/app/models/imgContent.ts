export class ImgContent{
    public imgName?:string;
    public imgBase64?:string;
    public imgContent?:any;
    public imgTagName?:string;
    public fileAction?:string;
    public filesType?:string;
    public mandatory?:boolean;
    public idFilesByDocGuardHouse?:number;
    public status?:boolean;
    constructor( imgName?:string, 
                 imgBase64?:string, 
                 imgContent?:any, 
                 imgTagName?:string,
                 fileAction?:string,
                 filesType?:string,
                 mandatory?:boolean,
                 idFilesByDocGuardHouse?:number,
                 status?:boolean) {
        this.imgName = imgName;
        this.imgBase64 = imgBase64;
        this.imgContent = imgContent;
        this.imgTagName = imgTagName;
        this.fileAction = fileAction;
        this.filesType = filesType;
        this.mandatory = mandatory; 
        this.idFilesByDocGuardHouse = idFilesByDocGuardHouse;
        this.status = status;
    }
}