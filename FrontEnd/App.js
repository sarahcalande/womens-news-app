import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, Linking, StyleSheet } from 'react-native';
import { ListItem } from "react-native-elements";
// import ArticleCard from './ArticlesCard.js'




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center'
  },
  title: {
  fontSize: 100,
  alignSelf: 'center'
},
  img: {
    alignSelf: 'center',
        height: 240,
        width: 420,
        margin: 10
  },
  subtitle: {
    padding: 20,
    textAlign: 'center'
  }
});


export default class App extends React.Component {

constructor(props){
  super(props);
this.state = { isLoading: true }
}


componentDidMount(){
  return fetch('http://localhost:3000/')
  .then((response)=> response.json())
  .then((responseJson) => {this.setState({
    isLoading: false,
    dataSource: responseJson.Articles
  }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }





  render(){

// console.log(this.state.articles)

if(this.state.isLoading){
  return(
    <View style={{flex: 1, padding: 20}}>
      <ActivityIndicator/>
    </View>
  )
}



return (
        <FlatList style={styles.container,{ paddingTop: 40, paddingSide: 30}}
          data={this.state.dataSource}
          renderItem={({item}) => (
      <ListItem
      title={
        <View style={styles.title}>
        <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>{item.article_title}</Text>
      </View>
    }
      subtitle={
        <View style={styles.container}>
            <Image
              source={{ uri: item.article_image }}
              style={styles.img}
            />
        <Text style={{ fontFamily: 'Helvetica', textAlign: 'center' }}> {item.article_date} by {item.article_author} </Text>
        <Text style={{ fontFamily: 'Helvetica', textAlign: 'center' }}> {item.description} </Text>
        </View>
      }
      onPress={()=>{Linking.openURL(item.article_link)}}
      />


    )}
        />
    );
  }
}
