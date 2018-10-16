/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import { incrementFunction } from './src/actions';

type Props = {
    number:  0
};
class App extends Component<Props> {
  state = {
    number : 0
  };

  constructor() {
      super();
      console.log(this.state, this.props);
  }
  componentWillReceiveProps(nextProps){
      console.log('componentWillReceiveProps',nextProps);
      this.setState({number: nextProps.number});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{ this.state.number }</Text>
          <Button
              title='increment'
              onPress={this._onPress.bind(this, this.state.number)}
          />
      </View>
    );
  }
    _onPress(number){
        console.log('_onPress');
        this.props.increment_count(number);
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
const mapStateToProps = state => {
    return {
        number:  state.counter.number
    }
};
const mapDispatchToProps = dispatch => {
    return {
        increment_count : number => dispatch(incrementFunction(number))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
