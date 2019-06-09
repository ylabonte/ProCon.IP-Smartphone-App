import {
    SettingsFieldType,
    SettingsFieldStorage,
    Setting
} from "~/app/settings/settings-field/settings-field";
import * as appSettings from "tns-core-modules/application-settings";

export class ApplicationSetting extends Setting {
    defaultValue: any;
    module: string;
    name: string;
    storage = SettingsFieldStorage.ApplicationSettings;
    storageField: string;
    type: SettingsFieldType;

    private _value: any;

    constructor(name: string, type: SettingsFieldType, defaultValue: any, storageFieldName?: string) {
        super();
        this.name = name;
        this.type = type;
        this.defaultValue = defaultValue;
        if (storageFieldName) {
            this.storageField = storageFieldName;
        } else {
            this.storageField = `_${this.module}.${this.name}.${this.constructor.name}`;
        }
        if (!appSettings.hasKey(this.storageField)) {

        }
    }

    get() {
        switch (this.type) {
            case SettingsFieldType.Boolean:
                this._value = appSettings.getBoolean(this.storageField, this.defaultValue);
                break;
            case SettingsFieldType.Number:
                this._value = appSettings.getNumber(this.storageField, this.defaultValue);
                break;
            case SettingsFieldType.String:
                this._value = appSettings.getString(this.storageField, this.defaultValue);
                break;
        }

        return this._value;
    }

    _set(value: any) {
        switch (this.type) {
            case SettingsFieldType.Boolean:
                appSettings.setBoolean(this.storageField, value);
                break;
            case SettingsFieldType.Number:
                appSettings.setNumber(this.storageField, value);
                break;
            case SettingsFieldType.String:
                appSettings.setString(this.storageField, value);
                break;
        }
    }
}
