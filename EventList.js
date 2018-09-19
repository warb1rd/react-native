import React, { Component } from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import EventCard from './EventCard';
import ActionButton from 'react-native-action-button';
import { getEvents } from './api';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 5,
  },
});

class EventList extends Component {
  state = {
    events: [],
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        events: this.state.events.map(evt => ({
          ...evt,
          timer: Date.now(),
        })),
      });
    }, 1000);

    getEvents().then(events => this.setState({ events }))
  }

  handleAddEvent = () => {
    this.props.navigation.navigate('form');
  }


  render() {
    return [
      <FlatList
        key="flatlist"
        data={this.state.events}
        style={styles.list}
        keyExtractor={item => item.id}
        renderItem={({ item, separators }) => (
          <EventCard
            event={item}
          />
        )}
      />,
      <ActionButton
        key="fab"
        buttonColor="rgba(231,76,60,1)"
        onPress={this.handleAddEvent}
      />,
    ];
  }
}

export default EventList; 