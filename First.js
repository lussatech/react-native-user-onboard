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
        <Image style={{width:111,height:111}} source={require('./images/first.png')} />
        <View style={{alignItems:'center'}}>
          <Text style={{margin:10,fontSize:20,fontWeight:'bold',textAlign:'center'}}>{`Pilih Jadwal`}</Text>
          <Text style={{margin:15,fontSize:15,textAlign:'center'}}>{`Pilih jadwal konsultasi Anda melalui portal ini. Cari klinik atau dokter pilihan anda.`}</Text>
        </View>
      </View>
    )
  }
}
