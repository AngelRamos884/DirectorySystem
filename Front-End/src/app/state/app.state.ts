import { ActionReducerMap } from "@ngrx/store";
import { IDirectoryState } from "../interfaces/IDirectoryState";
import { directoryReducer } from "./reducers/directory.reducers";

export interface AppState{
    directory:IDirectoryState; 
}

export const ROOT_REDUCERS:ActionReducerMap<AppState> = {
    directory: directoryReducer,
};