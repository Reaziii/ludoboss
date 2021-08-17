import React, {useEffect, useState} from 'react';
import {ImageBackground, Dimensions} from 'react-native';
import Modal from '../Component/Modal';
import ProfileNav from '../Component/profileBar';
import PlayOptions from '../Component/PlayOptions';
import {useDispatch, useSelector} from 'react-redux';
import {clear_all_modal, close_gameoptions, close_settings} from '../Redux/modal/actions';
import GameOptions from '../Component/GameOptions';
import Settings from '../Component/Settings';
const Home = () => {
  const [open, setopen] = useState(false);
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'CLEAR_GAME_DATA',
    });
    dispatch(clear_all_modal());
  }, []);
  return (
    <ImageBackground
      source={require('../Assets/Image/bg3.png')}
      style={{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        position: 'relative',
      }}>
      <Modal open={open} setopen={setopen} title="settings" />
      <ProfileNav />
      <PlayOptions />
      <Modal
        title="Online"
        open={modal.gameOptions}
        setopen={() => dispatch(close_gameoptions())}>
        <GameOptions />
      </Modal>
      <Modal
        title="Online"
        open={modal.settings}
        setopen={() => dispatch(close_settings())}>
        <Settings />
      </Modal>
    </ImageBackground>
  );
};

export default Home;
