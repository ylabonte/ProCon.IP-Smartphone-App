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

    // _data: IProconIpSettings = {
    //     host: "",
    //     port: 0,
    //     username: "",
    //     password: "",
    //     useSSL: false,
    //     autoUpdate: false,
    //     autoUpdateInterval: 3,
    //     mock: true
    // };

    _fieldDefinitions = [
        new ApplicationSetting("host", SettingsFieldType.String, "dirkeschbach.ddns.net"),
        new ApplicationSetting("port", SettingsFieldType.Number, 443),
        new ApplicationSetting("username", SettingsFieldType.String, "dirk"),
        new ApplicationSetting("password", SettingsFieldType.String, "pool@Eschi62"),
        new ApplicationSetting("useSSL", SettingsFieldType.Boolean, true),
        new ApplicationSetting("autoUpdate", SettingsFieldType.Boolean, false),
        new ApplicationSetting("autoUpdateInterval", SettingsFieldType.Number, 3),
        new ApplicationSetting("mock", SettingsFieldType.Boolean, true)
    ];

    private constructor() {
        super();
    //     this._fieldDefinitions.forEach((field: ISettingsField) => {
    //         if (this[field.name] !== undefined && this[field.name] !== null) {
    //             switch (this.getField(field.name).type) {
    //                 case SettingsFieldType.Boolean:
    //                     this[field.name] = Boolean(field.get());
    //                     break;
    //                 case SettingsFieldType.Number:
    //                     this[field.name] = Number(field.get());
    //                     break;
    //                 case SettingsFieldType.String:
    //                 default:
    //                     this[field.name] = String(field.get());
    //                     break;
    //             }
    //         }
    //     });
    }

    // get host(): string {
    //     return this.getField("host").value;
    // }
    //
    // set host(host: string) {
    //     this.getField("host").value = host;
    // }
    //
    // get port(): number {
    //     return this.getField("port").value;
    // }
    //
    // set port(port: number) {
    //     this.getField("port").value = port;
    // }
    //
    // get username(): string {
    //     return this.getField("username").value;
    // }
    //
    // set username(username: string) {
    //     this.getField("username").value = username;
    // }
    //
    // get password(): string {
    //     return this.getField("password").value;
    // }
    //
    // set password(password: string) {
    //     this.getField("password").value = password;
    // }
    //
    // get useSSL(): boolean {
    //     return this.getField("useSSL").value;
    // }
    //
    // set useSSL(useSSL: boolean) {
    //     this.getField("useSSL").value = useSSL;
    // }
    //
    // get autoUpdate(): boolean {
    //     return this.getField("autoUpdate").value;
    // }
    //
    // set autoUpdate(autoUpdate: boolean) {
    //     this.getField("autoUpdate").value = autoUpdate;
    // }
    //
    // get autoUpdateInterval(): number {
    //     return this.getField("autoUpdateInterval").value;
    // }
    //
    // set autoUpdateInterval(autoUpdateInterval: number) {
    //     this.getField("autoUpdateInterval").value = autoUpdateInterval;
    // }
    //
    // get mock(): boolean {
    //     return this.getField("mock").value;
    // }
    //
    // set mock(mock: boolean) {
    //     this.setField("mock", mock);
    // }
    //
    // getAll(): IProconIpSettings {
    //     const dataObject: IProconIpSettings = {
    //         host: this.host,
    //         port: this.port,
    //         username: this.username,
    //         password: this.password,
    //         useSSL: this.useSSL,
    //         autoUpdate: this.autoUpdate,
    //         autoUpdateInterval: this.autoUpdateInterval,
    //         mock: this.mock
    //     };
    //
    //     return dataObject;
    // }
    //
    // setAll(settings: IProconIpSettings) {
    //     Object.keys(settings).forEach((field) => {
    //         this[field] = settings[field];
    //     });
    // }

    // updateAll(data: IProconIpSettings) {
    //     Object.keys(data).forEach((name) => {
    //         this[name] = data[name];
    //     });
    // }
}
