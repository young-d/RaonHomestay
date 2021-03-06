import React, { useState, useEffect } from 'react';
import { URL } from '_utils/api';
import axios from 'axios';
import store from '_store/Store';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { hostApply } from '_actions/user';

function FormSubmit({ info, intro, amenity, rules, image, hostApply }) {
  const history = useHistory();
  const num = store.getState().userReducer.num;
  const hostInfo = info;
  const houseIntro = intro;
  const amenities = amenity;
  const houseRules = rules;
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(false);
  const data = {
    userNum: num,
    addr1: hostInfo.addr1,
    addr2: hostInfo.addr2,
    email1: hostInfo.email1,
    email2: hostInfo.email2,
    hp: hostInfo.hp,
    checkIn1: houseRules.checkIn1,
    checkIn2: houseRules.checkIn2,
    checkOut1: houseRules.checkOut1,
    checkOut2: houseRules.checkIn2,
    maxPeople: houseRules.maxPeople,
    price: houseRules.price,
    dogOk: amenities.dogOk ? 1 : 0,
    wifi: amenities.wifi ? 1 : 0,
    smokingOk: amenities.smokingOk ? 1 : 0,
    bathroom: amenities.bathroom ? 1 : 0,
    parking: amenities.parking ? 1 : 0,
    towel: amenities.towel ? 1 : 0,
    breakfast: amenities.breakfast ? 1 : 0,
    aircon: amenities.aircon ? 1 : 0,
    elecProduct: amenities.elecProduct ? 1 : 0,
    kitchen: amenities.kitchen ? 1 : 0,
    title: houseIntro.title,
    content: houseIntro.content,
    photo: houseIntro.photo,
  };
  const imageFile = image;

  useEffect(() => {
    const sendData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${URL}/house`, data).then(() => {
          alert('등록이 완료되었습니다');
        });

        console.log(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    console.log(data);
    const sendPhoto = async num => {
      let url = `${URL}/photo/${parseInt(num)}`;
      setLoading(true);
      try {
        const response = await axios.post(url, imageFile);

        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    console.dir(hostApply());

    sendData()
      .then(() => sendPhoto(num))
      .then(() => hostApply)
      .then(() => history.push('/'));
  }, []);

  if (loading) {
    return <p>대기중....</p>;
  }
  //articles 값이 설정되지 않았을때
  if (!contents) {
    return null;
  }
  // articles 값이 유효할때
  let appoval = contents.appoval;

  return <div></div>;
}
export default connect(null, dispatch => ({
  hostApply: () => dispatch(hostApply()),
}))(FormSubmit);
