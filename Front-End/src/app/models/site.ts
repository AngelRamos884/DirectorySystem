import { Base } from "./base";

export class Site extends Base{
    public nameRol?:string;
    constructor(id?:number,
                name?:string,
                description?:string,
                status?: boolean,
                createdDate?:string,
                createdBy?:string,
                nameRol?:string){
                    super(id, name, null, description, status, createdDate, createdBy);
                    this.nameRol = nameRol;
                }
}