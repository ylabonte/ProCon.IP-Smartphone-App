import { IProconIpSettings, ProconIpSettings } from "~/app/procon-ip/procon-ip-settings";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isIOS } from "tns-core-modules/platform";

declare var NSString: any;
declare var NSUTF8StringEncoding: any;
declare var java: any;
declare var android: any;

export abstract class AbstractRequestService {
    abstract urlPath: string;

    protected httpHeaders: HttpHeaders;

    protected const = AbstractRequestService;

    protected constructor(
        protected httpClient: HttpClient
    ) {
        this.httpHeaders = new HttpHeaders();
        this.addHttpHeader("Authorization", "Basic " + this.base64Credentials);
    }

    static get settings(): IProconIpSettings {
        return ProconIpSettings.instance().fields as IProconIpSettings;
    }

    static get baseUrl(): string {
        return `${this.settings.useSSL ? "https://" : "http://"}${this.settings.host}`;
    }

    get url(): string {
        return AbstractRequestService.baseUrl + this.urlPath;
    }

    addHttpHeader(name: string, value: string | Array<string>) {
        this.httpHeaders = this.httpHeaders.set(name, value);
    }

    private get base64Credentials(): string {
        const credentials = `${this.const.settings.username}:${this.const.settings.password}`;

        if (isIOS) {
            const text = NSString.stringWithString(credentials);
            const data = text.dataUsingEncoding(NSUTF8StringEncoding);

            return data.base64EncodedStringWithOptions(0);
        } else {
            const text = new java.lang.String(credentials);
            const data = text.getBytes("UTF-8");

            return android.util.Base64.encodeToString(data, android.util.Base64.DEFAULT);
        }
    }
}
