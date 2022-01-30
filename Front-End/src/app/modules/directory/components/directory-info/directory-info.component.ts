import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadDirectory } from '../../../../state/actions/directory.actions';
import { selectListDirectory, selectLoadingDirectory } from '../../../../state/selectors/serials.selectors';

@Component({
    selector: 'app-directory-info',
    templateUrl: './directory-info.component.html',
})
export class DirectoryInfoComponent implements OnInit {
    loading$:Observable<boolean> = new Observable();
    directory$:Observable<any> = new Observable();

    constructor(private store:Store) { }

    ngOnInit(): void {
        this.store.dispatch(loadDirectory());
        this.directory$ =  this.store.select(selectListDirectory);
        this.loading$ = this.store.select(selectLoadingDirectory);
     }
}
