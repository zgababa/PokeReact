import React from 'react';
import {render} from 'react-dom';

import AwesomeComponent from './app/AwesomeComponent.jsx';

class App extends React.Component {
 render() {
   return (
     <div>
       <p> Hello Fabs !!!!!!!!!!!!!!!</p>
       <AwesomeComponent/>
     </div>
  );
 }
}

render(<App/>, document.getElementById('app'));
