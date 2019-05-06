import { GetStateDataObject } from "./get-state-data-object";
import { GetStateDataSysInfo } from "./get-state-data-sys-info";

export enum GetStateCategory {
    TIME = "time",
    ANALOG = "analog",
    ELECTRODES = "electrodes",
    TEMPERATURES = "temperatures",
    RELAYS = "relays",
    DIGITAL_INPUT = "digitalInput",
    EXTERNAL_RELAYS = "externalRelays",
    CANISTER = "canister",
    CANISTER_CONSUMPTION = "canisterConsumptions"
}

export class GetStateData {
    /**
     * Raw input string
     */
    raw: string;

    /**
     * Csv input parsed to array
     */
    parsed: Array<Array<string>>;

    /**
     * SysInfo column data
     */
    sysInfo: GetStateDataSysInfo;

    /**
     * Actual data objects
     */
    objects: Array<GetStateDataObject>;

    /**
     * Indices of all objects not labeled with 'n.a.'
     */
    active: Array<number>;

    /**
     * Data categories as array of objects.
     *
     * Keys: Name of the category
     * Values: List of csv columns (type: numeric or numeric[2]) for that category. Since we are operating on array,
     *         columns are counted from 0. Arrays are expected to have two numeric values defining a column slice.
     */
    categories = {
        time: [0],
        analog: [[1, 5]],
        electrodes: [6, 7],
        temperatures: [[8, 15]],
        relays: [[16, 23]],
        digitalInput: [[24, 27]],
        externalRelays: [[28, 35]],
        canister: [[36, 38]],
        canisterConsumptions: [[39, 41]]
    };

    constructor(rawData: string) {
        this.objects = [];
        this.active = [];
        this.parseCsv(rawData);
    }

    getCategory(index: number): string {
        for (const category in this.categories) {
            if (this.categories[category].indexOf(index) >= 0) {
                return category;
            }
        }

        return "none";
    }

    getDataObjects(indices: Array<number>, activeOnly = false): Array<GetStateDataObject> {
        return activeOnly ?
            this.objects.filter((obj, idx) => indices.indexOf(idx) >= 0 && this.active.indexOf(idx) >= 0) :
            this.objects.filter((obj, idx) => indices.indexOf(idx) >= 0);
    }

    getDataObjectsByCategory(category: string, activeOnly = false): Array<GetStateDataObject> {
        return this.categories[category] === undefined ?
            [] : this.getDataObjects(this.categories[category], activeOnly);
    }

    parseCsv(csv: string) {
        // Save raw input string.
        this.raw = csv;
        // Parse csv into 2-dimensional array of strings.
        this.parsed = csv.split(/[\r\n]+/) // split rows
            .map((row) => row.split(/[,]/)) // split columns
            .filter((row) => row.length > 1 || row.length === 1 && row[0].trim().length > 1); // remove blank lines
        // Save common system information.
        this.sysInfo = new GetStateDataSysInfo(this.parsed);
        // Iterate data columns.
        this.active.length = 0;
        this.parsed[1].forEach((name, index) => {
            if (this.objects[index] === undefined) {
                // Add object to the objects array.
                this.objects[index] = new GetStateDataObject(index, name,
                    this.parsed[2][index],
                    this.parsed[3][index],
                    this.parsed[4][index],
                    this.parsed[5][index]
                );
            } else {
                this.objects[index].set(index, name,
                    this.parsed[2][index],
                    this.parsed[3][index],
                    this.parsed[4][index],
                    this.parsed[5][index]
                );
            }

            if (this.objects[index].active) { this.active.push(index); }
        });
        this.categorize();
    }

    private categorize() {
        Object.keys(this.categories).forEach((category) => {
            this.categories[category] = this.expandSlice(this.categories[category]);
            this.getDataObjectsByCategory(category).forEach((item, id) => {
                item.category = category;
                item.categoryId = id + 1;
            });
        });
    }

    private expandSlice(input: Array<any>): Array<number> {
        const output = [];
        input.forEach((def) => {
            if (Number.isInteger(def)) {
                output.push(def);
            }
            if (Array.isArray(def)) {
                def.map((subDef) => Number(subDef));
                for (let i = Number(def[0]); i <= Number(def[1]); i++) {
                    output.push(i);
                }
            }
        });

        return output;
    }
}
