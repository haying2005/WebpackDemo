import _ from 'lodash';
import com from './commonModule'

function component() {
    var element = document.createElement('div');
  
    element.innerHTML = _.join(['Hello', 'webpack!'], ' ');
    console.log('hello webpack!!!')
    return element;
  }
  
  document.body.appendChild(component());
  console.log(CURRENT_ENV);