import { ISettingsField, SettingsFieldType } from "~/app/settings/settings-field/settings-field";

export interface ISettingsDefinition {
    _fieldDefinitions: Array<ISettingsField>;
}

export interface ISettings {
    fields: object;
}

export abstract class Settings implements ISettingsDefinition, ISettings {
    _fieldDefinitions: Array<ISettingsField>;

    _fields: object = {};

    get fields(): object {
        this._fieldDefinitions.forEach((field) => {
            this._fields[field.name] = field.get();
        });

        return this._fields;
    }

    set fields(fields: object) {
        const fieldNotFoundException = {
            fieldName: "",
            value: {}
        };
        Object.keys(fields).forEach((fieldName) => {
            const field = this.getField(fieldName);
            if (!field) {
                fieldNotFoundException.fieldName = fieldName;
                fieldNotFoundException.value = fields[fieldName];
                throw fieldNotFoundException;
            }

            field.set(fields[field.name]);
        });
    }

    getField(name: string): ISettingsField {
        return this._fieldDefinitions.filter((field: ISettingsField) => field.name === name).pop();
    }

    setField(name: string, value: any) {
        for (const field of this._fieldDefinitions) {
            if (name === field.name) {
                switch (field.type) {
                    case SettingsFieldType.Boolean:
                        console.log("setting boolean value:", typeof value);
                        console.log("setting boolean value:", value.valueOf());
                        console.log("setting boolean value:", (/true|yes|on|1/i).test(value.valueOf()));
                        // field.value = (typeof value === "string") ? (/true|yes|on|1/i).test(value) : Boolean(value);
                        field.set((/true|yes|on|1/i).test(value.valueOf()));
                        break;
                    case SettingsFieldType.Number:
                        field.set(Number(value));
                        break;
                    case SettingsFieldType.String:
                        field.set(String(value));
                        break;
                }

                console.log(`setField ${name} in:`, value);
                console.log(`setField ${name}:`, field.get());
                break;
            }
        }
    }
}
