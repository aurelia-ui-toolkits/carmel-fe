// inspiration: https://github.com/jdubray/sam-safe

import {autoinject} from 'aurelia-framework';
import { AureliaSamActions } from './actions';
import { IAureliaSamAction } from './aurelia-sam-action';

@autoinject(AureliaSamActions)
export class AureliaSam {
  constructor(private actions: AureliaSamActions) { }

  public dispatch(action: string, data?: any) {
    // get next action from somewhere
    // example: removeTag => undo => nextAction(addTag)
    this.actions.execute(action, data, () => {});
  }

  public registerAction(action: IAureliaSamAction) {
    this.actions.register(action);
  }
}
