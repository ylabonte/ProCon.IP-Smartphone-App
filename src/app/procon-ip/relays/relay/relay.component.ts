import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";
import { UsrcfgCgiService } from "~/app/procon-ip/usrcfg-cgi.service";
import { RelayDataObject } from "~/app/procon-ip/relays/relay/relay-data-object";
import { RelayDataInterpreter } from "~/app/procon-ip/relays/relay/relay-data-interpreter";
import { Switch } from "tns-core-modules/ui/switch";

/**
 * Setting relay state
 * -------------------
 * Considerations:
 * - Two general options
 *   - GET /SetState.pl
 *     - Supported features: on, off, on-for-timer
 *   - POST /usrcfg.cgi
 *     - Supported features: on, off, auto
 *   - Native GUI behavior
 *     - By default: POST /usrcfg.cgi
 *     - For dosage control: ???
 *     - Other specials: ???
 */

@Component({
    selector: "ns-relay",
    templateUrl: "./relay.component.html",
    styleUrls: ["./relay.component.scss"],
    moduleId: module.id
})
export class RelayComponent implements OnInit {

    @Input() data: RelayDataObject;
    @Input() readonly: boolean;

    constructor(
        public relayDataInterpreter: RelayDataInterpreter,
        public usrcfgCgiService: UsrcfgCgiService
    ) {}

    ngOnInit() {}

    get label(): string {
        return this.data.label;
    }

    get value(): string {
        return this.data.displayValue;
    }

    get id(): number {
        return this.data.categoryId;
    }

    setAuto() {
        this.usrcfgCgiService.setAuto(this.data);
    }

    setOn() {
        this.usrcfgCgiService.setOn(this.data);
    }

    setOff() {
        this.usrcfgCgiService.setOff(this.data);
    }

    get isOn(): boolean {
        return this.relayDataInterpreter.isOn(this.data);
    }

    get isOff(): boolean {
        return this.relayDataInterpreter.isOff(this.data);
    }

    get isAuto(): boolean {
        return this.relayDataInterpreter.isAuto(this.data);
    }

    toggleAuto() {
        if (this.isAuto) {
            if (this.isOn) {
                this.setOn();
            } else {
                this.setOff();
            }
        } else {
            this.setAuto();
        }
    }
}
