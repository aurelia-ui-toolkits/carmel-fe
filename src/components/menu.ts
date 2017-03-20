import {inject, bindable} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';
import * as samples from 'https://aurelia-ui-toolkits.github.io/aurelia-kendoui-samples/samples.json!';

@inject(Element)
export class Menu {

  @bindable public router;
  public element: Element;
  public samples;
  public options;
  public toolbars = [];

  constructor(element) {
    this.element = element;
    this.toolbars = [];
  }

  public attached() {
    this.generateRow((<any> samples).menu);
  }

  public generateRow(data) {
    let div = DOM.createElement('div');
    let buttons = [];

    this.element.appendChild(div);

    let items = Object.keys(data);
    items.forEach(key => {
      let id = this.getId(this.toolbars.length, buttons.length);
      buttons.push({ type: 'button', id: id, text: key, togglable: true, data: data[key], rowIndex: this.toolbars.length });
    });

    let toolbar = kendo.jQuery(div).kendoToolBar({
      items: buttons
    }).data('kendoToolBar');

    toolbar.bind('toggle', this.deselectOthers);
    toolbar.bind('toggle', e => this.buttonClicked(e));

    this.toolbars.push({
      element: div,
      toolbar: toolbar
    });
  }

  public deselectOthers(e) {
    // deselect all but the button that has just been selected
    this.options.items.forEach(item => {
      if (item.id !== e.id) {
        // this.toggle('#' + item.id, false);
      }
    });
  }

  public buttonClicked(e) {
    let toolbar = e.sender;
    let options = toolbar.options;
    let clickedButton = options.items.find(i => i.id === e.id);

    let buttonData = clickedButton.data;
    let rowIndex = clickedButton.rowIndex;

    let i = (this.toolbars.length - 1);
    while (i > rowIndex) {
      this.toolbars[i].toolbar.destroy();
      this.toolbars[i].element.remove();
      this.toolbars.splice(i, 1);
      i--;
    }

    if (typeof buttonData !== 'string') {
      this.generateRow(buttonData);
    } else {
      this.router.navigateToRoute(buttonData);
    }
  }

  public getId(row, buttonIndex) {
    return `row${row}index${buttonIndex}`;
  }
}
