<h1 align="center">
  <br>
	<img src="branding/ministate-logo-v2-dark-mode-ok.svg" width="480" alt="Ministate">
	<br>
  <br>
</h1>

> Manage all your state the React way.

## Why?

Thanks [Jamie Kyle](https://github.com/jamiebuilds) for building [Unstated](https://unstated.io/) and opening the way for easier state management. Suddenly, many people began to think that [Redux](https://redux.js.org/) or [MobX](https://mobx.js.org/) might be too complicated for their needs.

Unstated's minimalist API is great, but if like me you don't need dependency injection, or you think that should be managed orthogonally with another library, you'll love Ministate's even simpler API.

## Installation

```bash
npm install @ministate/base
npm install @ministate/react
```

## Example

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Base from '@ministate/base';
import subscribe from '@ministate/react';

class App extends Base {
  state = {
    count: 0
  };

  increment() {
    this.setState({count: this.state.count + 1});
  }

  decrement() {
    this.setState({count: this.state.count - 1});
  }
}

const app = new App();

@subscribe(app)
class Component extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => app.decrement()}>-</button>
        <span>{app.state.count}</span>
        <button onClick={() => app.increment()}>+</button>
      </div>
    );
  }
}

ReactDOM.render(<Component />, document.getElementById('root'));
```

Simple, isn't it?

## API

### `Base` class

To use Ministate, just extend the base class.

Example:

```js
import Base from '@ministate/base';

class App extends Base {
  state = {
    count: 0
  };
}
```

### `new App()`

Create an instance of your Ministate subclass.

Example:

```js
const app = new App();
```

### `app.state`

Plain object containing your state. You should only read it, to change it, use `app.setState()`.

Example:

```js
console.log(app.state.count);
```

### `app.setState(updater[, callback])`

Change your state, the [React way](https://reactjs.org/docs/react-component.html#setstate).

Example:

```js
app.setState({count: 999});
```

### `@subscribe(app)`

Subscribe your React components to your Ministate instances so that your components are automatically rerendered when state change.

Example:

```js
import subscribe from '@ministate/react';

@subscribe(app)
class Component extends React.Component {
  render() {
    return <div>{app.state.count}</div>;
  }
}
```

## License

MIT
