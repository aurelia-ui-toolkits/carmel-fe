import {autoinject, bindable, observable} from 'aurelia-framework';
import {getLogger, Logger} from 'aurelia-logging';
import {IUser, UserService} from '../../services/user-service';

@autoinject()
export class CarmelEditor {
  @bindable() public carmelSample: any;
  public debugMode: false;
  private log: Logger;
  private user: IUser;
  @observable() private selectedRole: string;
  private tags: string[];

  constructor(private userService: UserService) {
    this.log = getLogger('carmel-editor');
    this.user = this.userService.getCurrent();
    if (this.user.roles.indexOf('admin') > -1) {
      this.selectedRole = 'admin';
    } else {
      this.selectedRole = 'editor';
    }
    this.tags = ['provided', 'initial', 'tags'];
  }

  public selectedRoleChanged(newValue: string) {
    if (newValue) {
      switch (newValue) {
        case 'admin':
          this.userService.useAdmin();
          break;
        case 'editor':
        default:
          this.userService.useEditor();
          break;
      }
      this.user = this.userService.getCurrent();
    }
  }

  public carmelSampleChanged(newValue) {
    this.log.debug('sample changes', newValue);
  }
}
