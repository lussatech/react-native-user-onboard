'use strict';

import React, {
  Component,
  Navigator,
  Text,
  View,
  TouchableOpacity,
  PropTypes,
  AsyncStorage,
  ToastAndroid
} from 'react-native';

import First from './First';
import Second from './Second';
import Third from './Third';
import Fourth from './Fourth';

export {First, Second, Third, Fourth};

export default class extends Component {
  static propTypes = {
    onFinish: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
        start: true,
       finish: true,
        index: 0
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value === null || value !== secret) {
          this.onFirst().done(() => {
            AsyncStorage.setItem(key, secret);
            setTimeout(() => {
              this.setState({finish: false});
            }, 1234);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.SHORT);
      })
      .done();
  }

  render() {
    if (this.state.finish) return this.onFinish();

    return (
      <View style={{flex:1}}>
        <Navigator
          ref={'navigator'}
          initialRoute={{index:0}}
          renderScene={(route, navigator) => {
            let Component = scenes[route.index];
            return <Component />;
          }}
          configureScene={(route) => {
            return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.PushFromRight;
          }}
        />
        <View style={{flex:1,flexDirection:'column',position:'absolute',top:5,left:0,right:5,alignItems:'flex-end'}}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => this.setState({finish: true})}>
            <Text>{`skip`}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,flexDirection:'column',position:'absolute',bottom:5,left:5,right:0,alignItems:'flex-start'}}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => this.goBack()}>
            <Text>{this.state.index === 0 ? `` : `prev`}</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1,flexDirection:'row',position:'absolute',bottom:5,left:0,right:0,justifyContent:'center',alignItems:'center'}}>
          {scenes.map((val, key) => {
            return (
              <TouchableOpacity key={key} activeOpacity={0.7}>
                <Text style={{margin:3}}>{this.state.index === key ? `-` : `.`}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{flex:1,flexDirection:'column',position:'absolute',bottom:5,left:0,right:5,alignItems:'flex-end'}}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => this.goNext()}>
            <Text>{this.state.index === scenes.length-1 ? `finish` : `next`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  goBack() {
    let index = this.refs.navigator.state.presentedIndex;

    this.setState({index: index-1});

    if (index === 0) return null;

    return this.refs.navigator.jumpBack();
  }

  goNext() {
    let route = this.refs.navigator.getCurrentRoutes(),
        index = this.refs.navigator.state.presentedIndex;

    this.setState({index: index+1});

    if (index < route.length-1) return this.refs.navigator.jumpForward();
    if (index === scenes.length-1) return this.setState({finish: true});

    return this.refs.navigator.push({index: ++index});
  }

  onFinish() {
    if (this.props.onFinish && this.props.onFinish()) return this.props.onFinish();

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'cyan'}}>
        <Text>
          Welcome to React Native!
        </Text>
      </View>
    );
  }

  async onFirst() {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      ToastAndroid.show(String(error).replace('Error: ',''), ToastAndroid.SHORT);
    }
  }
}

const key    = '@lussatech:onboard';
const secret = 'react-native-user-onboard';
const scenes = [First, Second, Third, Fourth];
