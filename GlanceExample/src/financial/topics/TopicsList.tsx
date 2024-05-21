import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Left, List, ListItem, Right, Text} from 'native-base';

import GlanceIcon from '../../scaffolding/components/GlanceIcon';

export default class TopicsList extends Component {
  render() {
    return (
      <List style={styles.list}>
        <ListItem itemDivider style={styles.divider}>
          <Text style={styles.text}>HELP TOPICS</Text>
        </ListItem>

        <ListItem style={styles.topic}>
          <Left>
            <Text style={styles.name}>Routing & Account Numbers</Text>
          </Left>

          <Right>
            <GlanceIcon
              name="icon-chevron"
              style={styles.iconChevron}></GlanceIcon>
          </Right>
        </ListItem>

        <ListItem style={styles.topic}>
          <Left>
            <Text style={styles.name}>Update Contact Information</Text>
          </Left>

          <Right>
            <GlanceIcon
              name="icon-chevron"
              style={styles.iconChevron}></GlanceIcon>
          </Right>
        </ListItem>

        <ListItem style={styles.topic}>
          <Left>
            <Text style={styles.name}>Card Settings</Text>
          </Left>

          <Right>
            <GlanceIcon
              name="icon-chevron"
              style={styles.iconChevron}></GlanceIcon>
          </Right>
        </ListItem>

        <ListItem style={styles.topic}>
          <Left>
            <Text style={styles.name}>Troubleshooting</Text>
          </Left>

          <Right>
            <GlanceIcon
              name="icon-chevron"
              style={styles.iconChevron}></GlanceIcon>
          </Right>
        </ListItem>

        <ListItem style={styles.topic}>
          <Left>
            <Text style={styles.name}>More Topics</Text>
          </Left>

          <Right>
            <GlanceIcon
              name="icon-chevron"
              style={styles.iconChevron}></GlanceIcon>
          </Right>
        </ListItem>
      </List>
    );
  }
}

const styles = StyleSheet.create({
  iconChevron: {
    color: '#9B9B9B',
    marginRight: 5,
    transform: [{rotate: '180deg'}],
  },
  list: {
    backgroundColor: '#FFFFFF',
  },
  divider: {
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    flexDirection: 'row',
    height: 45,
    paddingHorizontal: 15,
  },
  text: {
    color: '#5D5D60',
    fontSize: 13,
    marginLeft: 5,
  },
  topic: {
    borderBottomColor: '#D6D5DB',
    borderBottomWidth: 1,
    height: 55,
  },
  name: {
    color: '#9B9B9B',
  },
});
