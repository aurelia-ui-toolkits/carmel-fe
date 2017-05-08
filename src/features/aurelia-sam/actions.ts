import { autoinject } from 'aurelia-framework';
import { AureliaSamModel } from './model';
import { IAureliaSamAction } from './aurelia-sam-action';

@autoinject(AureliaSamModel)
export class AureliaSamActions {
  private actions: any = {};

  constructor(private model: AureliaSamModel) { }

  public execute(action: string, data, next) {
    const newData = this.actions[action].execute(data, next);
    this.model.present(newData, next);
  }

  public register(action: IAureliaSamAction) {
    // TODO: use a map
    this.actions[action.intent] = action;
  }
}
