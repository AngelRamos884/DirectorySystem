import { Base } from "./base";

export class AuditTemplate extends Base{
    public auditTypeId?:number;
    public zoneId?:number;
    public recurrenceId?:number;
    public processId?:number;
    public levelId?:number;
    public areaId?:number;

    constructor(id?:number,
                status?: boolean,
                createdDate?:string,
                createdBy?:string,
                auditTypeId?:number,
                zoneId?:number,
                recurrenceId?:number,
                processId?:number,
                levelId?:number,
                areaId?:number){
            super(id, null, null, null, status, createdDate, createdBy);
            this.auditTypeId = auditTypeId;
            this.zoneId = zoneId;
            this.recurrenceId = recurrenceId;
            this.processId = processId;
            this.levelId = levelId;
            this.areaId = areaId;
        }
}