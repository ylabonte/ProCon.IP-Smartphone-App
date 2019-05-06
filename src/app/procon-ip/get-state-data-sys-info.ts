export class GetStateDataSysInfo {
  time: string;
  uptime: string;
  version: string;
  resetRootCause: string;
  ntpFaultState: string;
  configOtherEnable: string;
  dosageControl: string;
  phPlusDosageRelais: string;
  phMinusDosageRelais: string;
  phChlorDosageRelais: string;

  constructor(data?: Array<Array<string>>) {
    if (data) {
      this.setValuesFromArray(data);
    }
  }

  setValuesFromArray(data: Array<Array<string>>) {
    this.version = data[0][1];
    this.uptime = Number(data[0][2]).toFixed(2);
    this.resetRootCause = Number(data[0][3]).toFixed(2);
    this.ntpFaultState = Number(data[0][4]).toFixed(2);
    this.configOtherEnable = Number(data[0][5]).toFixed(2);
    this.dosageControl = Number(data[0][6]).toFixed(2);
    this.phPlusDosageRelais = Number(data[0][7]).toFixed(2);
    this.phMinusDosageRelais = Number(data[0][8]).toFixed(2);
    this.phChlorDosageRelais = Number(data[0][9]).toFixed(2);
  }

  toArrayOfObjects(): Array<{key: string, value: string}> {
      const values = new Array<{key: string, value: string}>();
      Object.keys(this).forEach((attr) => { values.push({key: attr, value: this[attr]}); });

      return values;
  }
}
