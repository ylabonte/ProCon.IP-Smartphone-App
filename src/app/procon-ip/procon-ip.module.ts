import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ProconIpRoutingModule } from "./procon-ip-routing.module";
import { ProconIpComponent } from "./procon-ip.component";
import { HttpClientModule } from "@angular/common/http";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { SystemInfoComponent } from "./system-info/system-info.component";
import { RelaysComponent } from "./relays/relays.component";
import { RelayComponent } from "./relays/relay/relay.component";
import { MeasuresComponent } from "~/app/procon-ip/measures/measures.component";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular";
import { CanisterComponent } from "~/app/procon-ip/measures/canister/canister.component";
import { ElectrodesComponent } from "~/app/procon-ip/measures/electrodes/electrodes.component";
import { ProconIpSettingsComponent } from "~/app/procon-ip/procon-ip-settings.component";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIGaugeModule,
        NativeScriptUIDataFormModule,
        HttpClientModule,
        ProconIpRoutingModule,
    ],
    declarations: [
        ProconIpComponent,
        SystemInfoComponent,
        RelaysComponent,
        RelayComponent,
        MeasuresComponent,
        CanisterComponent,
        ElectrodesComponent,
        ProconIpSettingsComponent,
    ],
    exports: [
        ProconIpSettingsComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: []
})
export class ProconIpModule { }
