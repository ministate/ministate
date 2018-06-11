import React from 'react';

export function subscribe(source) {
  return function (WrappedComponent) {
    return class MinistateSubscriber extends React.Component {
      update = () => {
        if (this._isMounted) {
          this.setState({});
        }
      };

      componentDidMount() {
        source.subscribe(this.update);
        this._isMounted = true;
      }

      componentWillUnmount() {
        source.unsubscribe(this.update);
        this._isMounted = false;
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
}

export default subscribe;
