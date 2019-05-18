import { GetStateDataObject } from "~/app/procon-ip/get-state-data-object";
import { ScaleParams } from "~/app/procon-ip/measures/scale-params";

export class ElectrodeDataObject extends GetStateDataObject {
    scale: ScaleParams;

    constructor(data: GetStateDataObject, params: ScaleParams) {
        super(data.id, data.label, data.unit, data.offset.toString(), data.gain.toString(), data.raw.toString());
        this.scale = params;
    }
}
