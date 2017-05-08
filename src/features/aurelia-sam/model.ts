import {autoinject} from 'aurelia-framework';
import {AureliaSamState} from './state';

@autoinject(AureliaSamState)
export class AureliaSamModel {
  private history = [];
  constructor(private state: AureliaSamState) { }

  public present(data, next) {
    // validate data and accept or reject the data
    this.history.push(data);
    this.render(data, next);
  }

  private render(data, next) {
    this.state.render(data, next);
  }
}
