import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

class ThemeContentProvider extends Component {
  state = { 
    chosenTheme: 'green',
    green: {
      primary: '#85ffbd',
      accent: '#ffb7d',
      gradient: 'linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%)'
    },
    orange: {
      primary: '#FAD961',
      accent: '#F76B1C',
      gradient: 'linear-gradient(62deg, #FAD961 0%, #F76B1C 100%',
    },
    purple: {
      primary: '#FF3CAC',
      accent: '#784BA0',
      gradient: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%',
    }
   }
  render() { 
    return (
      <ThemeContext.Provider value={{...this.state}}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
 
export default ThemeContentProvider;