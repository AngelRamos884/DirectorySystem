"use strict";(self.webpackChunkdirectory=self.webpackChunkdirectory||[]).push([[618],{618:(M,s,e)=>{e.r(s),e.d(s,{HomeModule:()=>A});var i=e(8583),u=e(9812),c=e(8259),d=e.n(c),r=e(7716),h=e(6347);let a=(()=>{class t{constructor(o,l){this._authService=o,this.router=l}canActivate(){return localStorage.getItem("token")?!!this._authService.isAuth()||(d().fire({icon:"error",title:"Token",text:"Your token has expired"}).then(l=>(this.router.navigateByUrl("/auth"),!1)),!1):(this.router.navigateByUrl("/auth"),!1)}canLoad(o,l){return!!this._authService.isAuth()||(d().fire({icon:"error",title:"Token",text:"Your token has expired"}).then(S=>(this.router.navigateByUrl("/auth"),!1)),!1)}}return t.\u0275fac=function(o){return new(o||t)(r.LFG(h.e),r.LFG(u.F0))},t.\u0275prov=r.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();const f=[{path:"directory",canActivate:[a],canLoad:[a],loadChildren:()=>Promise.all([e.e(592),e.e(809)]).then(e.bind(e,2809)).then(t=>t.DirectoryModule)},{path:"directory-actions",canActivate:[a],canLoad:[a],loadChildren:()=>Promise.all([e.e(592),e.e(853)]).then(e.bind(e,7853)).then(t=>t.DirectoryActionsModule)},{path:"",canActivate:[a],canLoad:[a]}];let m=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[u.Bz.forChild(f)],u.Bz]}),t})();var v=e(665);let y=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({providers:[],imports:[[u.Bz,i.ez,v.u5]]}),t})(),A=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[i.ez,m,y]]}),t})()}}]);