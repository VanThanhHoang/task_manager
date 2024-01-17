import MessageModel from '../Models/MessageModel';
import moment from 'moment';
/* eslint-disable @typescript-eslint/no-unused-vars */
export const getFirstLetters = (name: String) => {
  let arr = name.split(' ');

  let firstLetter = arr[0]?.charAt(0).toUpperCase();
  let secondLetter = arr[1]?.charAt(0).toUpperCase()
    ? arr[1]?.charAt(0).toUpperCase()
    : '';

  return firstLetter + '' + secondLetter;
};

export const getTime = (date: string) => {
  let time = new Date(date);
  return time.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
};

export const sortByDate = (arr: Array<MessageModel>) => {
  const sortedArr = arr.sort((a, b) => {
    return moment(a.sendTime).diff(b.sendTime);
  });
  return sortedArr;
};
