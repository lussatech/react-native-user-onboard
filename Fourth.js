'use strict';

import React, {
  Component,
  View,
  Image,
  Text
} from 'react-native';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff'}}>
        <Image style={{width:111,height:111}} source={require('./images/fourth.png')} />
        <View style={{alignItems:'center'}}>
          <Text style={{margin:10,fontSize:20,fontWeight:'bold',textAlign:'center'}}>{`Daftar Ulang`}</Text>
          <Text style={{margin:15,fontSize:15,textAlign:'center'}}>{`Daftar ulang di rumah sakit kami dan anda tidak perlu mengantri lagi.`}</Text>
        </View>
      </View>
    )
  }
}
