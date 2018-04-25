import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import CircleButton from '../elements/CircleButton';
import firebase from 'firebase';

class MemoCreateScreen extends React.Component {
  state = {
    body: '',
  }
  handlePress() {
    const db = firebase.firestore();
    const { params } = this.props.navigation.state;

    db.collection(`users/${params.currentUser.uid}/memos`).add({
      body: this.state.body,
      createdOn: new Date(),
    })
    .then((docRef) => {
      console.log(docRef.id);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.memoCreateInput}
          maltiline
          value={this.state.body}
          onChangeText = {(text) => { this.setState({ body: text }); }}
        />
        <CircleButton onPress={this.handlePress.bind(this)}>
          {'\uf00c'}
        </CircleButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoCreateInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default MemoCreateScreen;
