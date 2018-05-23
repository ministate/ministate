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

    if (callback) {
      this.subscribeOnce(callback);
    }

    this.publish();
  }

  publish() {
    if (!this._deferredPublication) {
      this._deferredPublication = true;

      defer(() => {
        this._deferredPublication = false;

        // Since subscribers can unsubscribe themselves,
        // let's copy them to ensure a proper iteration
        const subscribers = [...this._subscribers];

        for (const subscriber of subscribers) {
          subscriber();
        }
      });
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

  subscribeOnce(subscriber) {
    const volatileSubscriber = () => {
      this.unsubscribe(volatileSubscriber);
      subscriber();
    };

    this.subscribe(volatileSubscriber);
  }
}

export default Base;
