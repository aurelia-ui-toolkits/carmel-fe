import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {ThemeManager} from './theme-selector/theme-manager';
import {Settings} from '../../settings';

@autoinject()
export class App {
  public router: Router;

  constructor(private settings: Settings, private themeManager: ThemeManager) { }

  public attached() {
    return this.themeManager.loadTheme(this.settings.defaultTheme);
  }

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
