import { createAction, props } from "@ngrx/store";
import { IDirectoryModel } from "../../interfaces/IDirectoryModel";

export const loadDirectory = createAction('[Directory List] Load Directory');

export const loadedDirectory = createAction('[Directory List] Loaded success', props<{directory:IDirectoryModel[]}>());
