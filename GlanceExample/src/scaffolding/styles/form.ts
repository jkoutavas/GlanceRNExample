import {StyleSheet} from 'react-native';

export const form = StyleSheet.create({
  component: {
    marginBottom: 10,
  },
});

export const divider = StyleSheet.create({
  component: {
    alignItems: 'center',
    borderColor: '#BCBBC1',
    borderBottomWidth: 1,
    backgroundColor: '#EFEFF4',
    flexDirection: 'row',
  },
  componentNoBorder: {
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    flexDirection: 'row',
  },
  text: {
    color: '#8E8E93',
    fontSize: 13,
  },
});

export const input = StyleSheet.create({
  label: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '500',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  space: {
    height: 12,
  },
  default: {
    backgroundColor: '#FFF',
    borderColor: '#D5D5DB',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 42,
    paddingLeft: 15,
  },
  switch: {
    backgroundColor: '#FFF',
    borderColor: '#D5D5DB',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    height: 46,
    marginLeft: 0,
  },
  switchLabel: {
    marginHorizontal: 16,
  },
  switchInput: {
    marginLeft: 'auto',
  },
});

export const link = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    height: 10,
    marginTop: 7,
    marginBottom: 15,
  },
  text: {
    color: '#007AFF',
    fontSize: 12,
  },
});

export const placeholderTextColor = '#8E8E93';
