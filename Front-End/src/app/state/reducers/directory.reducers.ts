import { createReducer, on } from "@ngrx/store";
import { IDirectoryState } from "../../interfaces/IDirectoryState";
import { loadedDirectory, loadDirectory } from "../actions/directory.actions";

export const initialState: IDirectoryState = { loading:false , directory:[] }

export const directoryReducer = createReducer(
    initialState,
    on(loadDirectory, (state) => ({ ...state, loading:true })),
    on(loadedDirectory, (state, {directory}) => ({ ...state, loading:false, directory }))
)

