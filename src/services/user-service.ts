import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

export interface IUser {
  name: string;
  roles: string[];
}

const mockAdminUser: IUser = {
  name: 'Adriatic',
  roles: ['admin', 'editor']
};

const mockEditorUser: IUser = {
  name: 'Thanood',
  roles: ['editor']
};

@autoinject()
export class UserService {
  private currentUser: IUser;

  constructor(private eventAggregator: EventAggregator) {
    this.currentUser = mockEditorUser;
  }

  public getCurrent(): IUser {
    return this.currentUser;
  }

  public useAdmin() {
    this.currentUser = mockAdminUser;
    this.eventAggregator.publish('user:changed', this.currentUser);
  }

  public useEditor() {
    this.currentUser = mockEditorUser;
    this.eventAggregator.publish('user:changed', this.currentUser);
  }
}
