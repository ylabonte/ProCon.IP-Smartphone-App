import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { TabView, TabViewItem, SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import * as app from "tns-core-modules/application";
import { GetStateService } from "~/app/procon-ip/get-state.service";

@Component({
    selector: "ProconIp",
    moduleId: module.id,
    templateUrl: "./procon-ip.component.html",
    styles: [".tab-title { }"]
})
export class ProconIpComponent implements OnInit {

    tabSelectedIndex = 1;

    constructor(
        public getStateService: GetStateService
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.getStateService.start();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
