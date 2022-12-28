import React from 'react';
import '../styles/loading.scss';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-cont">
        <div className="loading" />
      </div>
    );
  }
}

export default Loading;
