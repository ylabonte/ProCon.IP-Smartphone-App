import { Component, OnInit } from "@angular/core";
import { GetStateService } from "~/app/procon-ip/get-state.service";
import { GetStateDataSysInfo } from "~/app/procon-ip/get-state-data-sys-info";

@Component({
    selector: "ns-system-info",
    templateUrl: "./system-info.component.html",
    moduleId: module.id
})
export class SystemInfoComponent implements OnInit {

    private data: GetStateDataSysInfo;

    constructor(
        public getStateService: GetStateService
    ) {}

    ngOnInit() {
        this.data = this.getStateService.data.sysInfo;
        console.log(this.data);
    }

    update(systemInformation: GetStateDataSysInfo) {
        this.data = systemInformation;
    }
}
