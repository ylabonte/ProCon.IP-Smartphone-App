import { Component, OnInit } from "@angular/core";
import { GetStateService } from "~/app/procon-ip/get-state.service";
import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";
import { GetStateCategory } from "~/app/procon-ip/get-state-data";

@Component({
    selector: "ns-measures",
    templateUrl: "./measures.component.html",
    styleUrls: ["./measures.component.scss"],
    moduleId: module.id
})
export class MeasuresComponent implements OnInit {

    constructor(
        public getStateService: GetStateService
    ) {}

    ngOnInit() {}

    get canister(): Array<GetStateDataObject> {
        return this.getStateService.data.getDataObjectsByCategory(GetStateCategory.CANISTER)
                                        .filter((can) => this.getStateService.data.sysInfo.isDosageEnabled(can));
    }

    get electrodes(): Array<GetStateDataObject> {
        return this.getStateService.data.getDataObjectsByCategory(GetStateCategory.ELECTRODES);
    }

    get temperatures(): Array<GetStateDataObject> {
        return this.getStateService.data.getDataObjectsByCategory(GetStateCategory.TEMPERATURES, true);
    }
}
