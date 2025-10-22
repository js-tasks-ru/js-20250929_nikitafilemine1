export default class NotificationMessage {
  static lastShownComponent;

  constructor(message, { duration = 0, type = "" } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = this._createElement();
  }

  _createElement() {
    const elementWrapper = document.createElement("div");
    const durationInSec = this.duration / 1000;
    elementWrapper.innerHTML = `
      <div class="notification ${this.type}" style="--value:${durationInSec}s">
        <div class="timer"></div>
          <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
    const element = elementWrapper.firstElementChild;
    return element;
  }

  show(container) {
    if (NotificationMessage.lastShownComponent) {
      NotificationMessage.lastShownComponent.remove();
    }
    NotificationMessage.lastShownComponent = this;
    const body = document.querySelector("body");
    (container ? container : body).appendChild(this.element);
    this.timerId = setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    clearTimeout(this.timerId);
  }
}
