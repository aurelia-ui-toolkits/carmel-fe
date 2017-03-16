import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Carmel';
    config.map([
      { name: 'about',            route: 'about',             moduleId: 'about/about',                 title: 'About' },
      { name: 'home',             route: '',                  redirect: 'about/about' },
      { name: 'components',       route: 'components',        moduleId: 'components/index',            title: 'Components' },
    ]);

    this.router = router;
  }
}
