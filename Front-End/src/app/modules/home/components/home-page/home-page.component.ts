import { Component, OnInit } from '@angular/core';
import * as AdminLte from '../../../../../assets/dist/js/adminlte.js'; //../../assets/dist/js/adminlte.js

@Component({
    selector: 'app-home-page',
    templateUrl: 'home-page.component.html'
})

export class HomePageComponent implements OnInit {
    
    constructor() { }

    ngOnInit(): void {
        var IsCollapsed = false;
        $('#pushmenu').on('click', () => {
          if(!IsCollapsed){
            $('body').addClass('sidebar-collapse');
            IsCollapsed = false;
          }
          else{
            $('body').removeClass('sidebar-collapse');
            IsCollapsed = true;
          }
          IsCollapsed = !IsCollapsed;
        });
      }
    
      ngAfterViewInit() {
        $('[data-widget="treeview"]').each(function() {
          AdminLte.Treeview._jQueryInterface.call($(this), 'init');
        });
        
      }
}