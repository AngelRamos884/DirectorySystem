import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title, Meta, MetaDefinition } from "@angular/platform-browser";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  title:string = "";
  icon:string = "";
  constructor( private router: Router,
               private mainTitle: Title,
               private meta: Meta) { 

   this.getDataRoute()
   .subscribe( ( data ) => {
      this.title = data.title;
      this.icon = data.icon
      this.mainTitle.setTitle(this.title)
    
      const metaTag:MetaDefinition = {
        name: 'description', 
        content: this.title        
      };

      this.meta.updateTag(metaTag)
    })

   }

  ngOnInit(): void {
  }

  getDataRoute():Observable<any>{
    return this.router.events.
    pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data)
    )
    
  }

}
