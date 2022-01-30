import { IBaseModel } from "./IBaseModel";

export interface IDirectoryModel extends IBaseModel{
    productId:String,
    serialNumber:String,
    transactionCount:String,
    maxComplaintValue:String,
    maxReturnValue:String,
    processedSerials:any[]
}