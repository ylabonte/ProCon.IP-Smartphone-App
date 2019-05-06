import { Component, OnInit } from "@angular/core";
import { GetStateService } from "~/app/procon-ip/get-state.service";
import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";
import { RelayDataObject } from "~/app/procon-ip/relays/relay/relay-data-object";

@Component({
    selector: "ns-relays",
    templateUrl: "./relays.component.html",
    styleUrls: ["./relays.component.scss"],
    moduleId: module.id
})
export class RelaysComponent implements OnInit {
    static categoryId = "relays";
    relays: Array<GetStateDataObject>;

    constructor(
        public getStateService: GetStateService
    ) {}

    ngOnInit() {
        this.relays = this.getStateService.data.getDataObjectsByCategory(RelaysComponent.categoryId, true);
    }
}
