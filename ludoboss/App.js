import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory, Switch, Route} from 'react-router-native';
import auth from '@react-native-firebase/auth';
import Home from './Screens/Home';
import Login from './Screens/Login';
import PlayGround from './Screens/PlayGround';
import SearchGame from './Screens/SearchGame';
import axios from 'axios';
import {backendUrl} from './Utils/server';
import HomeLoading from './Component/HomeLoading';
import Profile from './Screens/Profile';
// Sound.setCategory('Playback');
const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setloading] = useState(true);
  const [aloading, setaloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setaloading(false);
    }, 1000);
    auth().onAuthStateChanged(async user => {
      if (user) {
        let data = {
          userid: user.uid,
          user,
        };
        await axios.post(backendUrl + 'user/login', data).then(res => {});
        await axios.post(backendUrl + 'profile/timage', data).then(res => {
          dispatch({
            type: 'USERPHOTO',
            payload: res.data.content,
          });
        });
        dispatch({
          type: 'LOGIN',
          payload: user,
        });
        setloading(false);
        history.push('/');
      } else {
        dispatch({
          type: 'LOGIN',
          payload: null,
        });
        setloading(false);
        history.push('/login');
      }
    });
  }, []);

  if (loading || aloading) {
    return <HomeLoading />;
  }
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/playground" component={PlayGround} exact />
      <Route path="/searchgame/:price" component={SearchGame} exact />
      <Route path="/profile" component={Profile} exact/>
    </Switch>
  );
};

export default App;
