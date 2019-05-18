import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AbstractRequestService } from "~/app/procon-ip/abstract-request-service";
import { GetStateService } from "~/app/procon-ip/get-state.service";
import { GetStateData } from "~/app/procon-ip/get-state-data";
import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";
import { RelayDataInterpreter, RelayStateBitMask } from "~/app/procon-ip/relays/relay/relay-data-interpreter";
import { Observable, of } from "rxjs";
import { ProconIpSettings } from "~/app/procon-ip/procon-ip-settings";
import { RelayDataObject } from "~/app/procon-ip/relays/relay/relay-data-object";

export enum SetStateValue {
    ON = 1,
    OFF = 0,
    AUTO = 2
}

@Injectable({
    providedIn: "root"
})
export class UsrcfgCgiService extends AbstractRequestService {
    urlPath = "/usrcfg.cgi";

    private stateData: GetStateData;

    constructor(
        protected httpClient: HttpClient,
        private getStateService: GetStateService,
        private relayDataInterpreter: RelayDataInterpreter
    ) {
        super(httpClient);
        this.stateData = this.getStateService.data;
        this.addHttpHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    }

    setOn(relayData: GetStateDataObject) {
        this.setState(relayData, SetStateValue.ON);
    }

    setOff(relayData: GetStateDataObject) {
        this.setState(relayData, SetStateValue.OFF);
    }

    setAuto(relayData: GetStateDataObject) {
        this.setState(relayData, SetStateValue.AUTO);
    }

    private setState(relay: GetStateDataObject, state: SetStateValue|number) {
        let data: [number, number];
        let desiredValue: number;
        switch (state) {
            case SetStateValue.ON:
                data = this.relayDataInterpreter.evaluate(this.getStateService.data).setOn(relay);
                desiredValue = RelayStateBitMask.manual | RelayStateBitMask.on;
                break;
            case SetStateValue.OFF:
                data = this.relayDataInterpreter.evaluate(this.getStateService.data).setOff(relay);
                desiredValue = RelayStateBitMask.manual | ~RelayStateBitMask.on;
                break;
            case SetStateValue.AUTO:
                data = this.relayDataInterpreter.evaluate(this.getStateService.data).setAuto(relay);
                desiredValue = relay.raw & ~RelayStateBitMask.manual;
                break;
        }

        this.send(data).subscribe((response) => {
            console.log(response);
            if (["continue", "done"].indexOf(response.toLowerCase()) >= 0) {
                this.getStateService.data.objects[relay.id].set(
                    relay.id,
                    relay.label,
                    relay.unit,
                    relay.offset.toString(),
                    relay.gain.toString(),
                    desiredValue.toString()
                );
                // this.getStateService.update();
            } else {
                console.error("Error sending relay control command", response);
            }
        });
    }

    private send(bitTupel: [number, number]): Observable<string> {
        const body = new HttpParams().set("ENA", bitTupel.join(",")).set("MANUAL", "1");
        console.log(`POST ${this.url}\n${body.toString()}`);

        if (ProconIpSettings.instance().getField("mock").get()) {
            return of("Continue");
        }

        return this.httpClient.post(this.url, body.toString(), {
            responseType: "text",
            observe: "body",
            headers: this.httpHeaders
        });
    }
}
