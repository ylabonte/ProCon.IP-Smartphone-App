import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { UsrcfgCgiService } from "~/app/procon-ip/usrcfg-cgi.service";
import { RelayDataObject } from "~/app/procon-ip/relays/relay/relay-data-object";
import { RelayDataInterpreter } from "~/app/procon-ip/relays/relay/relay-data-interpreter";
import { Switch } from "tns-core-modules/ui/switch";
import { EventData } from "tns-core-modules/data/observable";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";

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
export class RelayComponent implements AfterViewInit {

    @Input() data: RelayDataObject;
    @Input() readonly: boolean;

    @ViewChild("onOffToggle") onOffToggle: ElementRef;

    constructor(
        public relayDataInterpreter: RelayDataInterpreter,
        public usrcfgCgiService: UsrcfgCgiService
    ) {}

    ngAfterViewInit() {
        const onOffSwitch: Switch = this.onOffToggle.nativeElement;
        if (onOffSwitch.isEnabled) {
            console.log(`registering toggle event for ${this.data.label}`);
            onOffSwitch.on("checkedChange", (event: EventData) => {
                const eventSwitch = event.object as Switch;
                if (eventSwitch.checked) {
                    this.setOn();
                } else {
                    this.setOff();
                }
            });
        }
    }

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

    toggleOnOff(event: EventData) {
        const onOffSwitch = event.object as Switch;
        if (onOffSwitch.checked) {
            this.setOn();
        } else {
            this.setOff();
        }
    }
}
