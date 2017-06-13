import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Carmel';
    config.map([
      { name: 'kendo', route: 'kendo', moduleId: 'libraries/kendo/app', title: 'Kendo' },
      { route: '', redirect: 'kendo' }
    ]);

    this.router = router;
  }
}
