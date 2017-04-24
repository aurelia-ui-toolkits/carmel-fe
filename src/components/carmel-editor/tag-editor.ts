import {autoinject, bindable, bindingMode, customAttribute, DOM, Loader} from 'aurelia-framework';
import * as taggy from 'taggy';

@autoinject()
@customAttribute('tag-editor')
export class TagEditor {
  // how to check if styles are loaded without using SystemJS? ;-)
  private static stylesAreLoaded = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) private tags: string[] = [];
  private taggyInstance: any;

  constructor(private element: Element, private loader: Loader) {
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  public attached() {
    const taggyOptions = {
      autocomplete: {
        noMatches: 'no matches',
        suggestions: (data) => {
          return Promise.resolve([ {list: ['provided', 'autocomplete', 'tags']} ]);
        }
      }
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
    this.tags.push(tag);
  }

  private handleRemove(tag) {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }
}
