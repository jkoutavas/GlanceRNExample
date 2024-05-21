import {StyleSheet} from 'react-native';

export const list = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  },
});

export const divider = StyleSheet.create({
  base: {
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
});

export const transaction = StyleSheet.create({
  base: {
    borderBottomColor: '#D6D5DB',
    borderBottomWidth: 1,
  },
  left: {
    flexDirection: 'column',
  },
  status: {
    alignSelf: 'flex-start',
    color: '#9B9B9B',
    fontSize: 11,
    marginLeft: 0,
  },
  name: {
    alignSelf: 'flex-start',
    color: '#4A4A4A',
    fontSize: 15,
    marginLeft: 0,
  },
  right: {
    flexBasis: 55,
    flexDirection: 'column',
    paddingRight: 5,
  },
  amount: {
    color: '#4A4A4A',
    fontSize: 16,
  },
  mask: {
    color: '#197441',
    fontSize: 16,
    fontWeight: '600',
  },
});
