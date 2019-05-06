export enum SettingsFieldType {
    Boolean = "boolean",
    Number = "number",
    String = "string"
}

export enum SettingsFieldStorage {
    ApplicationSettings = "application-settings",
    Custom = "custom",
    None = "none"
}

export interface ISettingsField {
    defaultValue: any;
    module: string;
    name: string;
    storage: SettingsFieldStorage;
    type: SettingsFieldType;

    castBoolean(value: any): boolean;
    castNumber(value: any): number;
    castString(value: any): string;

    get(): boolean|number|string;
    set(value: any);
}

export abstract class Setting implements ISettingsField {
    defaultValue: any;
    module: string;
    name: string;
    storage: SettingsFieldStorage;
    type: SettingsFieldType;

    abstract get(): boolean|number|string;

    castBoolean(value: any): boolean {
        switch (typeof value) {
            case "boolean":
                return value;
                break;
            case "number":
                return value !== 0;
                break;
            case "string":
                return !(/^false|off|no|0$/i).test(value);
                break;
        }
    }

    castNumber(value: any): number {
        switch (typeof value) {
            case "boolean":
                return value ? 1 : 0;
                break;
            case "number":
                return value;
                break;
            default:
                return Number(value);
                break;
        }
    }

    castString(value: any): string {
        return typeof value === "string" ? value : String(value);
    }

    set(value: any) {
        console.log("setting value:", value);
        switch (this.type) {
            case SettingsFieldType.Boolean:
                this._set(this.castBoolean(value));
                break;
            case SettingsFieldType.Number:
                this._set(this.castNumber(value));
                break;
            case SettingsFieldType.String:
                this._set(this.castString(value));
                break;
        }
    }

    protected abstract _set(value: boolean|number|string);
}
