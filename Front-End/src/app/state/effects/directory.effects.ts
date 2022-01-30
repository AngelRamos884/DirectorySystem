import { Injectable } from "@angular/core";
import { DirectoryService } from "@modules/directory/services/directory.service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";

@Injectable()
export class SerialEffect {

    loadDirectory$ = createEffect(() => this.actions$.pipe(
        ofType('[Directory List] Load Directory'),
        mergeMap(() => this._directoryService.getAllById('getDirectory',null)
        .pipe(
            map(directory => ({type:'[Directory List] Loaded success', directory})),
            catchError(() => EMPTY)            
            ))
        )
    );
    
    constructor(private actions$:Actions, private _directoryService:DirectoryService){

    }
}
