import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

const aureliaUiToolkitsSource = 'https://aurelia-ui-toolkits.github.io/aurelia-kendoui-samples/samples.json';

@autoinject()
export class SampleService {
  private cache: any = null;

  constructor(private http: HttpClient) { }

  public getSamples(): Promise<any> {
    if (this.cache) {
      return Promise.resolve(this.cache);
    }
    return this.http.fetch(aureliaUiToolkitsSource)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(samples => {
        this.cache = (<any> samples);
        return this.cache;
      });
  }
}
