import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { AppLoading } from 'expo';
import { FlatList, ActivityIndicator, View,TouchableOpacity, SafeAreaView  } from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Item, Input, Icon, Alert, IconButton} from 'native-base';


import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  componentDidMount(text) {

    if (text) {
    } else {
      text = 'isbak'
    }
 const  query  =  encodeURIComponent(text);
    return fetch(`https://newsapi.org/v2/everything?language=tr&q=${query}&apiKey=f8fa9ddab2cd4deda6963ffc6e70adc7&sortBy=publishedAt`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.articles,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
 
  render() {
    return (
      <SafeAreaView>

     
 
        
<Header searchBar rounded>
<Item>

<Input 
       style={{borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
       onChangeText={(text) => this.componentDidMount(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
      
        />
                  </Item>

        </Header>
        
       
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
          <List>
            <ListItem >
            <TouchableOpacity onPress={ ()=>{  WebBrowser.openBrowserAsync(item.url)}}>
              <Body>
                <Text>{item.title}</Text>
              </Body>
              </TouchableOpacity>
            </ListItem>
          </List>
           )}
           keyExtractor={({ id }, index) => id}
         />
      
      <Button transparent>
            <Text>Search</Text>
          </Button>

      </SafeAreaView>

    );
  }
}
HomeScreen.navigationOptions = {
  title: 'Haberler',
};
