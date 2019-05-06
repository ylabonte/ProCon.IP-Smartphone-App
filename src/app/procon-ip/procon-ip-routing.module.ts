import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";

import { ProconIpComponent } from "./procon-ip.component";
import { SystemInfoComponent } from "~/app/procon-ip/system-info/system-info.component";
import { RelaysComponent } from "~/app/procon-ip/relays/relays.component";

const routes: Routes = [{
   path: "",
   component: ProconIpComponent
}];
// const routes: Routes = [{
//     path: "",
//     redirectTo: "/procon-ip/(relaysTab:relays//systemTab:system/default)",
//     pathMatch: "full"
// }, {
//     path: "system",
//     component: NSEmptyOutletComponent,
//     loadChildren: "~/app/procon-ip/system-info/system-info.module#SystemInfoModule",
//     outlet: "systemTab"
// }, {
//     path: "relays",
//     component: RelaysComponent,
//     outlet: "relaysTab"
// }];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ProconIpRoutingModule { }
