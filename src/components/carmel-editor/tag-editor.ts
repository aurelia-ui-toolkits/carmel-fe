import {autoinject, bindable, bindingMode, customAttribute, DOM, Loader} from 'aurelia-framework';
import {SampleService} from '../../services/sample-service';
import {AureliaSam} from '../../features/aurelia-sam/aurelia-sam';
import * as taggy from 'taggy';

@autoinject()
@customAttribute('tag-editor')
export class TagEditor {
  // how to check if styles are loaded without using SystemJS? ;-)
  private static stylesAreLoaded = false;

  @bindable({ defaultBindingMode: bindingMode.oneTime }) private delimiter = ' ';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) private tags: string[] = [];
  private taggyInstance: any;

  constructor(private element: Element, private loader: Loader, private sampleService: SampleService, private sam: AureliaSam) {
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);

    this.sam.registerAction({ intent: 'add-tag', execute: (data) => {
      return [...this.tags, data];
    } });
    this.sam.registerAction({ intent: 'remove-tag', execute: (data) => {
      let tags = [...this.tags];
      const index = tags.indexOf(data);
      if (index > -1) {
        tags.splice(index, 1);
      }
      return tags;
    } });
  }

  public attached() {
    const taggyOptions = {
      autocomplete: {
        noMatches: 'no matches',
        suggestions: (data) => {
          // return Promise.resolve([ {list: ['provided', 'autocomplete', 'tags']} ]);
          return this.sampleService.getTagCompletions();
        }
      },
      deletion: true,
      delimiter: this.delimiter
    };

    let promise: Promise<any>;
    if (TagEditor.stylesAreLoaded) {
      promise = Promise.resolve();
    } else {
      promise = this.loader.loadText('taggy/taggy.css').then((css) => {
        DOM.injectStyles(css);
      });
    }
    promise.then(() => {
      this.taggyInstance = taggy(this.element, taggyOptions);
      this.tags.forEach(tag => this.taggyInstance.addItem(tag));

      this.taggyInstance.on('add', this.handleAdd);
      this.taggyInstance.on('remove', this.handleRemove);
    });
  }

  public detached() {
    this.taggyInstance.destroy();
  }

  private handleAdd(tag) {
    this.sam.dispatch('add-tag', tag);
    this.tags.push(tag);
  }

  private handleRemove(tag) {
    this.sam.dispatch('remove-tag', tag);
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }
}
