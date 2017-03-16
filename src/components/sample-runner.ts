import {inject, bindable} from 'aurelia-framework';
import {TemplatingEngine, ViewResources} from 'aurelia-templating';
import {activationStrategy} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {TaskQueue} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Settings} from '../settings';

@inject(EventAggregator, TaskQueue, Settings, TemplatingEngine, ViewResources)
export class SampleRunner {


}
