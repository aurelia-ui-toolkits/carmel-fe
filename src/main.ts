// import 'bootstrap';
import {Settings} from './settings';
// import {ThemeManager} from './shared/theme-manager';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-kendoui-bridge', (kendo) => kendo.detect().notifyBindingBehavior())
    .plugin('aurelia-after-attached-plugin');

  aurelia.use.globalResources('shared/markdown');
  aurelia.use.globalResources('shared/logger');
  aurelia.use.globalResources('components/carmel-editor/carmel-editor');

  aurelia.start()
  // .then(au => {
  //   let manager = au.container.get(ThemeManager);
  //   let settings = au.container.get(Settings);
  //   return manager.loadTheme(settings.defaultTheme)
  //          .then(() => au);
  // })
  .then(au => au.setRoot('app'));
}
