import { Base } from "./base";

export class FileByConfDocument extends Base{
    
    public idFilesType?:number;
    public filesType?:String;
    public idDocumentByGuardHouse?:number;
    public documentByGuardHouse?:string;
    public idDocumentType?:number;
    public documentType?:string;
    public idSite?:number;
    public site?:string;
    public idGuardHouse?:number;
    public idFileAction?:number;
    public mandatory?:boolean;
    public fileAction?:string;
    public adjunct?:boolean;
    public imgTagName?:string;
    public path?:string;
    constructor
    ( id?:number, 
      name?:string, 
      code?:string,            
      description?:string, 
      status?:boolean, 
      createdDate?:string, 
      createdBy?:string,
      updatedDate?:string, 
      updatedBy?:string,
      idFilesType?:number,
      filesType?:String,      
      idDocumentByGuardHouse?:number,
      documentByGuardHouse?:string,
      idDocumentType?:number,
      documentType?:string,
      idSite?:number,
      site?:string,
      idGuardHouse?:number,
      idFileAction?:number,
      mandatory?:boolean,
      fileAction?:string,
      adjunct?:boolean,
      imgTagName?:string,
      path?:string) {
        super(id, code, name, description, status, createdDate, createdBy, updatedDate, updatedBy);
        this.idFilesType = idFilesType;
        this.filesType = filesType;
        this.idDocumentByGuardHouse = idDocumentByGuardHouse;
        this.documentByGuardHouse = documentByGuardHouse;
        this.idDocumentType = idDocumentType;
        this.documentType = documentType;
        this.idSite = idSite;
        this.site = site;
        this.idGuardHouse = idGuardHouse;
        this.idFileAction = idFileAction;
        this.mandatory = mandatory;
        this.fileAction = fileAction;
        this.adjunct = adjunct;
        this.imgTagName = imgTagName;
        this.path = path;
}
}