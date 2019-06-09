import { ApplicationSetting } from "~/app/settings/settings-field/application-setting";
import { ISettingsField, SettingsFieldType } from "~/app/settings/settings-field/settings-field";
import { Settings } from "~/app/settings/settings";

export interface IProconIpSettings {
    host: string;
    port: number;
    username: string;
    password: string;
    useSSL: boolean;
    autoUpdate: boolean;
    autoUpdateInterval: number;
    mock: boolean;
}

export class ProconIpSettings extends Settings {

    static instance(): ProconIpSettings {
        if (ProconIpSettings._instance === undefined || ProconIpSettings._instance === null) {
            ProconIpSettings._instance = new ProconIpSettings();
        }

        return ProconIpSettings._instance;
    }

    private static _instance: ProconIpSettings;

    get settings(): IProconIpSettings {
        return this.fields as IProconIpSettings;
    }

    set settings(fields: IProconIpSettings) {
        this.fields = fields;
    }

    _fieldDefinitions = [
        new ApplicationSetting("host", SettingsFieldType.String, ""),
        new ApplicationSetting("port", SettingsFieldType.Number, 80),
        new ApplicationSetting("username", SettingsFieldType.String, "admin"),
        new ApplicationSetting("password", SettingsFieldType.String, "admin"),
        new ApplicationSetting("useSSL", SettingsFieldType.Boolean, false),
        new ApplicationSetting("autoUpdate", SettingsFieldType.Boolean, true),
        new ApplicationSetting("autoUpdateInterval", SettingsFieldType.Number, 3),
        new ApplicationSetting("mock", SettingsFieldType.Boolean, false)
    ];

    private constructor() {
        super();
    }
}
