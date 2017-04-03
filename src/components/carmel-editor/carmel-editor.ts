import {bindable} from 'aurelia-framework';
import {getLogger, Logger} from 'aurelia-logging';

export class CarmelEditor {
  @bindable() public carmelSample: any;
  private log: Logger;

  constructor() {
    this.log = getLogger('carmel-editor');
  }

  public carmelSampleChanged(newValue) {
    this.log.debug('sample changes', newValue);
  }
}
