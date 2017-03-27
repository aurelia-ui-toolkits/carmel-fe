import {inject, bindable} from 'aurelia-framework';
import {TemplatingEngine, ViewResources} from 'aurelia-templating';
import {activationStrategy, RouteConfig, Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TaskQueue} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';

@inject(EventAggregator, TaskQueue, Settings, TemplatingEngine, ViewResources)
export class SampleRunner {
  private category: any;
  private router: Router;
  private routes: any;

  public activate(params: any, routeConfig: RouteConfig) {
    this.category = routeConfig.category;
    this.routes = routeConfig.navModel.router.routes;
    let baseModuleId = routeConfig.baseModuleId;
    this.router = routeConfig.navModel.router;
    this.routes = this.router.routes.filter(r => r.category === this.category && r.baseModuleId === baseModuleId);
    console.log('activate', arguments);
  }
}
