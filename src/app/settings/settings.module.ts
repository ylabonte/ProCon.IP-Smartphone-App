import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { FormsModule } from "@angular/forms";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { SettingsComponent } from "./settings.component";
import { ProconIpModule } from "~/app/procon-ip/procon-ip.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        FormsModule,
        NativeScriptUIDataFormModule,
        ProconIpModule,
    ],
    declarations: [
        SettingsComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
