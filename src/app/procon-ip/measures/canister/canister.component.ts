import { Component, Input, OnInit } from "@angular/core";
import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";

@Component({
    selector: "ns-canister",
    templateUrl: "./canister.component.html",
    styleUrls: ["./canister.component.scss"],
    moduleId: module.id
})
export class CanisterComponent implements OnInit {
    @Input() data: Array<GetStateDataObject>;
    columnsDef: string;

    ngOnInit() {
        this.columnsDef = this.data.map(() => "*").join(",");
    }
}
