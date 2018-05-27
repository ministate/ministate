import defer from 'tickedoff';

export class Base {
  state = {};

  _subscribers = [];

  setState(newState, callback) {
    if (typeof newState === 'function') {
      newState = newState(this.state);
    }

    if (newState === null) {
      // If there is a callback, it will not be executed, and this is intentional
      return;
    }

    Object.assign(this.state, newState);

    this.publish();

    // Since publish() is deffered, it's okay to add subscribers afterward
    if (callback) {
      this.subscribeOnce(callback);
    } else {
      return new Promise(resolve => {
        this.subscribeOnce(resolve);
      });
    }
  }

  publish() {
    if (!this._deferredPublication) {
      this._deferredPublication = true;
      defer(() => {
        this._deferredPublication = false;
        for (const subscriber of this._subscribers) {
          subscriber();
        }
      });
    }
  }

  subscribe(subscriber) {
    this._subscribers = [...this._subscribers, subscriber];
  }

  unsubscribe(subscriber) {
    const index = this._subscribers.indexOf(subscriber);
    if (index !== -1) {
      this._subscribers = [
        ...this._subscribers.slice(0, index),
        ...this._subscribers.slice(index + 1)
      ];
    }
  }

  subscribeOnce(subscriber) {
    const volatileSubscriber = () => {
      this.unsubscribe(volatileSubscriber);
      subscriber();
    };

    this.subscribe(volatileSubscriber);
  }
}

export default Base;
