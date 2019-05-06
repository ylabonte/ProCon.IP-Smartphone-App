import { Injectable } from "@angular/core";
import { GetStateData } from "~/app/procon-ip/get-state-data";
import { RelaysComponent } from "~/app/procon-ip/relays/relays.component";
import { RelayDataObject } from "~/app/procon-ip/relays/relay/relay-data-object";
import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";

/**
 * The relay state is a two bit value in decimal representation:
 * - lsb: 0 = off, 1 = on
 * - msb: 0 = auto, 1 = manual
 */
export enum RelayStateBitMask {
    on = 1,
    manual = 2
    // off = 2,
    // on = 3,
    // autoOff = 0,
    // autoOn = 1
}

@Injectable({
    providedIn: "root"
})
export class RelayDataInterpreter {
    byteState: [number, number];

    evaluate(stateData: GetStateData): RelayDataInterpreter {
        const relays = stateData.getDataObjectsByCategory(RelaysComponent.categoryId);
        this.byteState = [255, 0];
        relays.forEach((data: GetStateDataObject) => {
            const relay = new RelayDataObject(data);
            if (this.isAuto(relay)) {
                this.byteState[0] &= ~relay.bitMask;
            }
            if (this.isOn(relay)) {
                this.byteState[1] |= relay.bitMask;
            }
        });

        return this;
    }

    isOn(relay: GetStateDataObject): boolean {
        return (relay.raw & RelayStateBitMask.on) === RelayStateBitMask.on;
    }

    isOff(relay: GetStateDataObject): boolean {
        return !this.isOn(relay);
    }

    isManual(relay: GetStateDataObject): boolean {
        return (relay.raw & RelayStateBitMask.manual) === RelayStateBitMask.manual;
    }

    isAuto(relay: GetStateDataObject): boolean {
        return !this.isManual(relay);
    }

    setOn(relay: GetStateDataObject): [number, number] {
        console.log(this.byteState);
        const relayObject = new RelayDataObject(relay);
        this.byteState[0] |= relayObject.bitMask;
        this.byteState[1] |= relayObject.bitMask;

        return this.byteState;
    }

    setOff(relay: GetStateDataObject): [number, number] {
        console.log(this.byteState);
        const relayObject = new RelayDataObject(relay);
        this.byteState[0] |= relayObject.bitMask;
        this.byteState[1] &= ~relayObject.bitMask;

        return this.byteState;
    }

    setAuto(relay: GetStateDataObject): [number, number] {
        console.log(this.byteState);
        const relayObject = new RelayDataObject(relay);
        this.byteState[0] &= ~relayObject.bitMask;
        this.byteState[1] &= ~relayObject.bitMask;

        return this.byteState;
    }
}
