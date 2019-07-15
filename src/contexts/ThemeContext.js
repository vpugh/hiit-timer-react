import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

const localTheme = localStorage.getItem('currentTheme');

class ThemeContentProvider extends Component {
  state = { 
    chosenTheme: JSON.parse(localTheme) || 'purple',
    options: [
      'green', 'orange', 'purple'
    ],
    green: {
      primary: '#85ffbd',
      accent: '#d8fc94',
      gradient: 'linear-gradient(45deg, #85ffbd 0%, #fffb7d 100%)',
      bgLink: '#000'
    },
    orange: {
      primary: '#FAD961',
      accent: '#F76B1C',
      gradient: 'linear-gradient(62deg, #FAD961 0%, #F76B1C 100%',
      bgLink: '#fff'
    },
    purple: {
      primary: '#FF3CAC',
      accent: '#784BA0',
      gradient: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%',
      bgLink: '#fff'
    }
   }

  updateTheme = theme => {
    this.setState({ chosenTheme: theme })
  }

  render() { 
    return (
      <ThemeContext.Provider value={{...this.state, updateTheme: this.updateTheme }}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
 
export default ThemeContentProvider;