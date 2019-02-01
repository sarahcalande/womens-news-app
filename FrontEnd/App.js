import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, Linking, StyleSheet } from 'react-native';
import { ListItem } from "react-native-elements";
// import ArticleCard from './ArticlesCard.js'




const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
  fontSize: 30,
  fontWeight: 'bold',
},
  img: {
    width: 410,
    height: 220,
  },
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
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
      <ListItem
      title={item.article_title}
      subtitle={
        <View style={styles.container}>
            <Image
              source={{ uri: item.article_image }}
              style={styles.img}
            />
        <Text> {item.article_date} </Text>
        <Text> {item.article_author} </Text>
        <Text> {item.description} </Text>
        </View>
      }
      onPress={()=>{Linking.openURL(item.article_link)}}
      />


    )}
        />
    );
  }
}
