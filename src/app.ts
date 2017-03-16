import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Carmel';
    config.map([
      { route: ['', 'about'], name: 'about',      moduleId: 'about',      nav: true, title: 'About Carmel' },

    ]);

    this.router = router;
  }
}
