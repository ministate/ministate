export class Base {
  state = {};

  _subscribers = [];

  setState(newState) {
    Object.assign(this.state, newState);
    this.publish();
  }

  publish() {
    for (const subscriber of this._subscribers) {
      subscriber();
    }
  }

  forceUpdate() {
    this.publish();
  }

  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const index = this._subscribers.indexOf(subscriber);
    if (index !== -1) {
      this._subscribers.splice(index, 1);
    }
  }
}

export default Base;
