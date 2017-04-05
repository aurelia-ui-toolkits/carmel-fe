import {autoinject, computedFrom} from 'aurelia-framework';
import {EventAggregator, Subscription} from 'aurelia-event-aggregator';
import {getLogger, Logger} from 'aurelia-logging';
import {IUser, UserService} from '../../services/user-service';

@autoinject()
export class CarmelToolbar {
  private log: Logger;
  private user: IUser;
  private subscriptions: Subscription[] = [];

  constructor(private eventAggregator: EventAggregator, private userService: UserService) {
    this.log = getLogger('carmel-toolbar');
    this.user = this.userService.getCurrent();
  }

  public attached() {
    this.subscriptions.push(this.eventAggregator.subscribe('user:changed', this.userChanged.bind(this)));
  }

  public detached() {
    this.subscriptions.forEach(sub => sub.dispose());
  }

  @computedFrom('user')
  public get isAdmin() {
    this.log.debug('is Admin');
    return this.user.roles.indexOf('admin') > -1;
  }

  public userChanged(user) {
    this.log.debug('user changed', user);
    this.user = user;
  }
}
