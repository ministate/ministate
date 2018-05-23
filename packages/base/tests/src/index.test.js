import Base from '../../..';

describe('Ministate', () => {
  test('setState(object, callback)', done => {
    class App extends Base {}

    const app = new App();

    expect(app.state).toEqual({});

    app.setState({count: 1}, () => {
      expect(app.state).toEqual({count: 1});

      app.setState({theme: 'dark'}, () => {
        expect(app.state).toEqual({count: 1, theme: 'dark'});
        done();
      });
    });
  });

  test('setState(updaterFunction, callback)', done => {
    class App extends Base {}
    const app = new App();

    expect(app.state).toEqual({});

    app.setState(
      previousState => {
        expect(previousState).toEqual({});
        return {count: 1};
      },
      () => {
        expect(app.state).toEqual({count: 1});

        app.setState(
          ({count}) => ({count: count + 1}),
          () => {
            expect(app.state).toEqual({count: 2});
            done();
          }
        );
      }
    );
  });

  test('subscribe(subscriber)', done => {
    class App extends Base {}
    const app = new App();

    let subscriberInvocations = 0;

    app.subscribe(() => subscriberInvocations++);

    expect(subscriberInvocations).toBe(0);

    app.setState({count: 1}, () => {
      expect(subscriberInvocations).toBe(1);

      app.setState({count: 2});
      app.setState({count: 3});
      app.setState({count: 4});
      app.setState({count: 5}, () => {
        expect(subscriberInvocations).toBe(2);
        done();
      });
    });
  });

  test('subscribeOnce(subscriber)', done => {
    class App extends Base {}
    const app = new App();

    let subscriberInvocations = 0;

    app.subscribeOnce(() => subscriberInvocations++);

    expect(subscriberInvocations).toBe(0);

    app.setState({count: 1}, () => {
      expect(subscriberInvocations).toBe(1);

      app.setState({count: 2}, () => {
        expect(subscriberInvocations).toBe(1);
        done();
      });
    });
  });

  test('unsubscribe(subscriber)', done => {
    class App extends Base {}
    const app = new App();

    let subscriberInvocations = 0;

    const subscriber = () => subscriberInvocations++;
    app.subscribe(subscriber);

    expect(subscriberInvocations).toBe(0);

    app.setState({count: 1}, () => {
      expect(subscriberInvocations).toBe(1);

      app.unsubscribe(subscriber);

      app.setState({count: 2}, () => {
        expect(subscriberInvocations).toBe(1);
        done();
      });
    });
  });

  test('publish()', done => {
    class App extends Base {}
    const app = new App();

    let subscriberInvocations = 0;
    app.subscribe(() => subscriberInvocations++);

    expect(subscriberInvocations).toBe(0);

    app.publish();
    expect(subscriberInvocations).toBe(0);

    setTimeout(() => {
      expect(subscriberInvocations).toBe(1);
      done();
    }, 1);
  });
});
