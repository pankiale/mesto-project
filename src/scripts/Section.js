export default class Section {
  constructor({ data, renderer }, selector/*".elements"*/) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.reverse().forEach(item => this._renderer(item));
  }

  setItem(element) {
    this._container.prepend(element);
  }
}
