import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";
import { RelayDataInterpreter } from "~/app/procon-ip/relays/relay/relay-data-interpreter";

export class RelayDataObject extends GetStateDataObject {
    constructor(data: GetStateDataObject) {
        super(data.id, data.label, data.unit, data.offset.toString(), data.gain.toString(), data.raw.toString());
        Object.keys(data).forEach((key) => { this[key] = data[key]; });
    }

    /**
     * Returns the bit mask for toggling the relay's state for the usrcfg.cgi endpoint.
     * @see UsrcfgCgiService
     */
    get bitMask(): number {
        return 1 << (this.categoryId - 1);
    }
}
