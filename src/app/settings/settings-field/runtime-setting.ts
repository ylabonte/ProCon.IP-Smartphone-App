import { Setting, SettingsFieldType, SettingsFieldStorage } from "~/app/settings/settings-field/settings-field";

export class RuntimeSetting extends Setting {
    defaultValue = null;
    module: string;
    name: string;
    storage = SettingsFieldStorage.None;
    type: SettingsFieldType;

    private _value: any;

    constructor(name: string, type: SettingsFieldType, defaultValue: any) {
        super();
        this.name = name;
        this.type = type;
        this.defaultValue = this._value = defaultValue;
    }

    get() {
        return this._value;
    }

    _set(value) {
        this._value = value;
    }
}
