import { IDirectoryModel } from "./IDirectoryModel";

export interface IDirectoryState {
    loading:boolean,
    directory:ReadonlyArray<IDirectoryModel>
}