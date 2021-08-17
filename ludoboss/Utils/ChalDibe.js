import axios from "axios";
import { backendUrl } from "./server";
export const ChalDibe = async (mypref,color,gameid,id) => {
  const data = {
    chal: color,
    gameid,
    id: id,
    from: mypref,
  };
  await axios
    .post(backendUrl + 'game/chaldibe', data)
    .then(res => {
    })
    .catch(err => console.log(err));
};
