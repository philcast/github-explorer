import * as React from 'react';
import RepositoryList from 'components/RepositoryList';

import './App.css';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2>Welcome to Github Explorer</h2>
        </div>
        <RepositoryList />
      </div>
    );
  }
}

export default App;
