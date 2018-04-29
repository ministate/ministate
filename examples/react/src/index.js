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
