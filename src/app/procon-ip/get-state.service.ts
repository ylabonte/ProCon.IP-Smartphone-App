import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GetStateCategory, GetStateData } from "./get-state-data";
import { Observable, of } from "rxjs";
import { GETSTATE } from "./mock-get-state";
import { ProconIpSettings } from "~/app/procon-ip/procon-ip-settings";
import { AbstractRequestService } from "~/app/procon-ip/abstract-request-service";
import { RelayComponent } from "~/app/procon-ip/relays/relay/relay.component";
import { RelaysComponent } from "~/app/procon-ip/relays/relays.component";
import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";
import { Label } from "tns-core-modules/ui/label";
import { Visibility } from "tns-core-modules/ui/enums";

@Injectable({
    providedIn: "root"
})
export class GetStateService extends AbstractRequestService {
    urlPath = "/GetState.csv";

    data: GetStateData;

    private _hasData = false;

    private next = null;

    private _errorView: Label;

    constructor(
        protected httpClient: HttpClient
    ) {
        super(httpClient);
        this.addHttpHeader("Accept", "text/csv,text/plain");
        this.data = new GetStateData();
        // this.data = new GetStateData(GETSTATE);
    }

    getUpdateInterval(): number {
        return Number(ProconIpSettings.instance().getField("autoUpdateInterval").get()) * 1000;
    }

    setUpdateInterval(milliseconds: number) {
        ProconIpSettings.instance().getField("autoUpdateInterval").set(milliseconds / 1000);
    }

    isRunning(): boolean {
        return Boolean(ProconIpSettings.instance().getField("autoUpdate").get()) && typeof this.next === "number";
    }

    start() {
        this.autoUpdate();
    }

    stop() {
        clearTimeout(this.next);
        this.next = null;
    }

    autoUpdate() {
        if (!ProconIpSettings.instance().getField("autoUpdate").get()) {
            return;
        }

        this.update();
        if (this.next === null) {
            this.next = setTimeout(() => {
                this.next = null;
                this.autoUpdate();
            }, this.getUpdateInterval());
        }
    }

    update() {
        this.getData().subscribe((data) => {
            this.data.parseCsv(data);
            this._hasData = true;
            this._errorView.visibility = Visibility.collapse;
        },
        (error) => {
            this._hasData = false;
            this._errorView.visibility = Visibility.visible;
        });
    }

    getData(): Observable<string> {
        if (ProconIpSettings.instance().getField("mock").get()) {
            return of(GETSTATE);
        }

        return this.httpClient.get(this.url, {
            responseType: "text",
            observe: "body",
            headers: this.httpHeaders
        });
    }

    hasData(): boolean {
        return this._hasData;
    }

    registerErrorView(msg: Label): void {
        this._errorView = msg;
    }
}
