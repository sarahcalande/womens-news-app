import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ArticleCard from './ArticlesCard.js'
import { FlatList } from 'react-native'


export default class App extends React.Component {


state = {
  articles: []
}

componentDidMount=()=>{
  fetch('http://localhost:3000/')
  .then(r=>r.json())
  .then(data => this.setState({
    articles: data
  }))
}



renderItem(data) {
    return <TouchableOpacity style={{backgroundColor: 'transparent'}}>
                <View style={styles.listItemContainer}>
                    <Text style={styles.pokeItemHeader}>{data.item.article_title}</Text>
                </View>
            </TouchableOpacity>
}



  render() {

console.log(this.state.articles) //array

  let articlecards = this.state.articles
    return (
      <FlatList
      data = {articlecards}
      renderItem = {this.renderItem}
       keyExtractor={(item) => item.article_title}

      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
