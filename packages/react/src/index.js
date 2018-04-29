import React from 'react';

export function subscribe(source) {
  return function (WrappedComponent) {
    return class MinistateSubscriber extends React.Component {
      update = () => {
        this.forceUpdate();
      };

      componentDidMount() {
        source.subscribe(this.update);
      }

      componentWillUnmount() {
        source.unsubscribe(this.update);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  };
}

export default subscribe;
