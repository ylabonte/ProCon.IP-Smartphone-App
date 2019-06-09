import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { GetStateService } from "~/app/procon-ip/get-state.service";
import { SwipeDirection, SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { connectionType, startMonitoring } from "tns-core-modules/connectivity";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { Label } from "tns-core-modules/ui/label";
import { Visibility } from "tns-core-modules/ui/enums";

@Component({
    selector: "ProconIp",
    moduleId: module.id,
    templateUrl: "./procon-ip.component.html",
    styleUrls: ["./procon-ip.component.scss"]
})
export class ProconIpComponent implements OnInit {

    @ViewChild("errorView") errorView: ElementRef;

    tabSelectedIndex = 1;

    constructor(
        public getStateService: GetStateService
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.getStateService.start();

        startMonitoring((newConnectionType) => {
            const msg: Label = (this.errorView.nativeElement as StackLayout).getViewById("errorNoInternet");
            switch (newConnectionType) {
                case connectionType.none:
                    msg.visibility = Visibility.visible;
                    break;
                case connectionType.wifi:
                case connectionType.mobile:
                case connectionType.ethernet:
                    msg.visibility = Visibility.collapse;
                    break;
            }
        });

        const reachabilityView = (this.errorView.nativeElement as StackLayout).getViewById("errorReachability");
        this.getStateService.registerErrorView(reachabilityView as Label);
    }

    onDrawerButtonTap() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSwipe(event: SwipeGestureEventData) {
        switch (event.direction) {
            case SwipeDirection.left:
                this.tabSelectedIndex = (this.tabSelectedIndex + 1 % 3) + 1;
                break;
            case SwipeDirection.right:
                this.tabSelectedIndex = (this.tabSelectedIndex - 1 % 3) + 1;
                break;
        }
        console.log("Swipe direction:", event.direction);
    }
}
