export class Base{
    public id?:number;
    public name: string;
    public code: string;
    public description?:string;
    public status?:boolean;
    public createdDate?:string;
    public createdBy?:string;
    public updatedDate:string;
    public updatedBy:string;
    constructor(id?:number,
                name?:string,
                code?:string,
                description?:string,
                status?: boolean,
                createdDate?:string,
                createdBy?:string,
                updatedDate?:string,
                updatedBy?:string){
                    this.id = id;
                    this.name = name;
                    this.code = code;
                    this.description = description;
                    this.status = status;
                    this.createdDate = createdDate;
                    this.createdBy = createdBy;
                    this.updatedDate = updatedDate;
                    this.updatedBy = updatedBy;
                }
}