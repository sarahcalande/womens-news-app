import React from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
// import ArticleCard from './ArticlesCard.js'


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
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.article_title}, {item.article_date}, {item.article_author}, {item.article_link}, {item.article_image}, {item.description}</Text>}
        />
      </View>
    );
  }
}
