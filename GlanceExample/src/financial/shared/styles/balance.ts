import {StyleSheet} from 'react-native';

export const balance = StyleSheet.create({
  layout: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 15,
    width: '100%',
  },
  left: {
    flexDirection: 'row',
  },
  icon: {
    color: '#197441',
    fontSize: 21,
  },
  iconBackground: {
    alignItems: 'center',
    backgroundColor: '#EFEFF4',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  account: {
    marginLeft: 15,
  },
  name: {
    color: '#4A4A4A',
    fontSize: 20,
    fontWeight: '400',
  },
  number: {
    color: '#4A4A4A',
    fontSize: 14,
    marginTop: 5,
  },
  amount: {
    color: '#3A3A3A',
    fontSize: 24,
    fontWeight: '400',
  },
  balance: {
    color: '#616161',
    fontSize: 14,
    marginTop: 5,
  },
});
