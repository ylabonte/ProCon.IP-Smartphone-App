import { Component, Input, OnInit } from "@angular/core";
import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";
import { ElectrodeDataObject } from "~/app/procon-ip/measures/electrodes/electrode-data-object";
import { IScaleParams, ScaleParams } from "~/app/procon-ip/measures/scale-params";
import { GetStateCategory, GetStateData } from "~/app/procon-ip/get-state-data";

@Component({
    selector: "ns-electrodes",
    templateUrl: "./electrodes.component.html",
    styleUrls: ["./electrodes.component.scss"],
    moduleId: module.id
})
export class ElectrodesComponent implements OnInit {

    @Input() data: GetStateData;

    ngOnInit() {
        this.data.getDataObjectsByCategory(GetStateCategory.ELECTRODES).forEach((e) => {
            console.log(`${e.label}: ${e.value}`);
        });
    }

    get electrodes() {
        return this.data.getDataObjectsByCategory(GetStateCategory.ELECTRODES).map((electrode) =>
            new ElectrodeDataObject(electrode, this.getScale(electrode))
        );
    }

    getScale(electrode: GetStateDataObject): IScaleParams {
        switch (electrode.unit) {
            case "pH":
                return new ScaleParams(6.0, 8.0, 5, 4, 3, 0.9, 225, [{
                    min: 6.0,
                    max: 6.6,
                    location: 0.97,
                    color: "#E2443E"
                }, {
                    min: 6.6,
                    max: 6.8,
                    location: 0.97,
                    color: "#E27633"
                }, {
                    min: 6.8,
                    max: 7.15,
                    location: 0.97,
                    color: "#F0C44D"
                }, {
                    min: 7.15,
                    max: 7.25,
                    location: 0.97,
                    color: "#9DCA56"
                }, {
                    min: 7.25,
                    max: 7.4,
                    location: 0.97,
                    color: "#F0C44D"
                }, {
                    min: 7.4,
                    max: 7.6,
                    location: 0.97,
                    color: "#E27633"
                }, {
                    min: 7.6,
                    max: 8.0,
                    location: 0.97,
                    color: "#E2443E"
                }]);
                break;
            case "mV":
                return new ScaleParams(0.0, 1000.0, 11, 4, 6);
                break;
            default:
                return new ScaleParams();
                break;
        }
    }

    asArray(value: any): Array<any> {
        return Array.isArray(value) ? value : [value];
    }
}
