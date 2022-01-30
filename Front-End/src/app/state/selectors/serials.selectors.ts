import { createSelector } from "@ngrx/store";
import { IDirectoryState } from "../../interfaces/IDirectoryState";
import { AppState } from "../app.state";

export const selectSerialsFeature =  (state:AppState) => state.directory;

export const selectListDirectory = createSelector(
    selectSerialsFeature,
    (state:IDirectoryState) => state.directory
)

export const selectLoadingDirectory = createSelector(
    selectSerialsFeature,
    (state:IDirectoryState) => state.loading
)
