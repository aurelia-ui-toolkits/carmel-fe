import {autoinject, bindable, bindingMode, customAttribute/*, DOM*/} from 'aurelia-framework';

@autoinject()
@customAttribute('tag-editor')
export class TagEditor {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) private tags: string[] = [];

  constructor(private element: Element) {
    this.handleChange = this.handleChange.bind(this);
  }

  public attached() {
    kendo.jQuery(this.element).tagEditor({
      initialTags: this.tags,
      onChange: this.handleChange
    });
  }

  public detached() {
    kendo.jQuery(this.element).tagEditor('destroy');
  }

  private handleChange(field: any[], editor: any[], tags: string[]) {
    this.tags = tags;
    // const event = DOM.createCustomEvent('change', { bubbles: true, details: { tags }});
    // this.element.dispatchEvent(event);
  }
}
