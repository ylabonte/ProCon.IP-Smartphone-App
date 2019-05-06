import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProconIpRoutingModule } from "./procon-ip-routing.module";
import { ProconIpComponent } from "./procon-ip.component";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { SystemInfoComponent } from "./system-info/system-info.component";
import { RelaysComponent } from "./relays/relays.component";
import { RelayComponent } from "./relays/relay/relay.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        HttpClientModule,
        ProconIpRoutingModule
    ],
    declarations: [
        ProconIpComponent,
        SystemInfoComponent,
        RelaysComponent,
        RelayComponent
    ],
    exports: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: []
})
export class ProconIpModule { }
