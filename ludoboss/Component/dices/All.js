import React from 'react';
import {View, Text, Image} from 'react-native';
import Five from './Five';
import Four from './Four';
import One from './One';
import Six from './Six';
import Three from './Three';
import Two from './Two';

const All = ({id}) => {
  if (id === 1) {
    return <One />;
  } else if (id === 2) {
    return <Two />;
  } else if (id === 3) {
    return <Three />;
  } else if (id === 4) {
    return <Four />;
  } else if (id === 5) {
    return <Five />;
  } else {
    return <Six />;
  } 
};

export default All;
