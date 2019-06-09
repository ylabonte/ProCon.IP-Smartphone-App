import { Component, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { IProconIpSettings, ProconIpSettings } from "../procon-ip/procon-ip-settings";
import { RadDataFormComponent } from "nativescript-ui-dataform/angular";
import { DataFormEventData } from "nativescript-ui-dataform";

@Component({
    selector: "procon-ip-settings",
    moduleId: module.id,
    templateUrl: "./procon-ip-settings.component.html"
})
export class ProconIpSettingsComponent implements OnInit {

    @ViewChild("proconIpSettingsDataForm") proconIpSettings: RadDataFormComponent;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit() {}

    get proconIp(): IProconIpSettings {
        return ProconIpSettings.instance().settings;
    }

    dfPropertyCommit(event: DataFormEventData) {
        ProconIpSettings.instance().setField(event.propertyName,
            this.proconIpSettings.dataForm.getPropertyByName(event.propertyName).valueCandidate);
    }
}
