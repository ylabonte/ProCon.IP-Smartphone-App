import { of } from "rxjs";

export class GetStateDataObject {
    id: number;
    label: string;
    raw: number;
    offset: number;
    gain: number;
    value: string|number;
    displayValue: string;
    unit: string;
    html: string;
    category: string;
    categoryId: number;
    active: boolean;

    constructor(index: number, name: string, unit: string, offset: string, gain: string, measure: string) {
        this.set(index, name, unit, offset, gain, measure);
    }

    set(index: number, name: string, unit: string, offset: string, gain: string, measure: string) {
        // Set basic object values.
        this.id = index;
        this.label = name;
        this.displayValue = "";
        this.html = "";
        this.unit = unit;
        this.offset = Number(offset);
        this.gain = Number(gain);
        this.raw = Number(measure);
        this.value = this.offset + (this.gain * this.raw);
        this.category = this.category === undefined ? "none" : this.category;
        this.categoryId = this.categoryId === undefined ? 0 : this.categoryId;
        this.active = name !== "n.a."; // Mark object as active if it is not labeled with 'n.a.'.

        // Set display value according to the object unit.
        switch (this.unit) {
            case "C":
            case "F":
                this.displayValue = `${Number(this.value).toFixed(2)} °${this.unit}`;
                break;
            case "h":
                this.displayValue = ((Number(this.value) >> 8) < 10 ? 0 : "") + "" +
                    (Number(this.value) >> 8) + ":" + ((Number(this.value) & 0xFF) < 10 ? 0 : "") + "" +
                    (Number(this.value) & 0xFF);
                break;
            case "--":
                this.displayValue = String(this.value);
                break;
            default:
                this.displayValue = `${Number(this.value).toFixed(2)} ${this.unit}`;
        }

        // Set html optimized display value.
        this.html = this.displayValue.replace(" ", "&nbsp;");
    }
}
