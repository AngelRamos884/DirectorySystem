import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadDirectory } from '../../../../app/state/actions/directory.actions';
import { selectLoadingDirectory } from '../../../../app/state/selectors/serials.selectors';

@Component({
    selector: 'app-directory-page',
    templateUrl: 'directory-page.component.html',
})
export class DirectoryPageComponent implements OnInit {

    loading$:Observable<boolean> = new Observable();
    
    constructor(private store:Store) { }

    ngOnInit(): void {
        this.store.dispatch(loadDirectory());

        this.loading$ = this.store.select(selectLoadingDirectory);
     }
}
