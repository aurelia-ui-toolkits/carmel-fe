import { autoinject } from 'aurelia-framework';
import { AureliaSamState } from './state';
import { Logger, getLogger } from 'aurelia-logging';

@autoinject(AureliaSamState)
export class AureliaSamModel {
  private history = [];
  private log: Logger;
  constructor(private state: AureliaSamState) {
    this.log = getLogger('AureliaSamModel');
  }

  public present(data, next) {
    // validate data and accept or reject the data
    this.history.push(data);
    this.log.debug('model present', data, next, this.history);
    this.render(data, next);
  }

  private render(data, next) {
    this.state.render(data, next);
  }
}
