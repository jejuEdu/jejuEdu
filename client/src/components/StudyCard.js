import styled from 'styled-components';
import React from 'react';

import { ChangeDate } from '../utils/ChangeDate';

import IconLocation from '../img/icon-location.png';
import IconMember from '../img/icon-member.png';
import IconCalendar from '../img/icon-calendar.png';
import tree_2_1x from '../img/tree_2_1x.png';
import tree_3_1x from '../img/tree_3_1x.png';
import tree_4_1x from '../img/tree_4_1x.png';
import tree_1_1x from '../img/tree_1_1x.png';

export default function StudyCard({ item }) {
  const handleImage = (currentValue, totalValue) => {
    if (totalValue === currentValue) return tree_4_1x;
    if (parseInt(totalValue / 4) * 3 <= currentValue) return tree_3_1x;
    if (parseInt(totalValue / 4) * 2 <= currentValue) return tree_2_1x;
    if (parseInt(totalValue / 4) >= currentValue) return tree_1_1x;
  };

  return (
    <StudyBox>
      <DDay>모집 마감 D-{item.Dday}</DDay>
      <StudyTitle>{item.study_title}</StudyTitle>
      <UtilityGroup>
        <div>
          <img src={IconCalendar} alt="지역" width="21px" />
          <p>{ChangeDate(item.studyAt_date)}</p>
        </div>
        <div>
          <img src={IconMember} alt="참여인원" width="20px" />
          <p>{`${item.current_member_cnt} / ${item.min_member_cnt}`}</p>
        </div>
      </UtilityGroup>
      <Location>
        <img src={IconLocation} alt="지역" width="15px" />
        <p>{item.studyAt_location /* tmX, tmY값이 넘어옴 location없어짐 */}</p>
      </Location>
    </StudyBox>
  );
}

const StudyBox = styled.div`
  margin: 24px 0px 0px;
  position: relative;
`;

const DDay = styled.div`
  display: inline-flex;
  padding: 5px 11px;
  margin-bottom: 19px;
  /* background: ; */
  border-radius: 20px;
  border: 1px solid black;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  text-align: center;
  /* color: ㅠ; */
`;

const StudyTitle = styled.p`
  max-width: 70%;
  max-height: 44px;
  margin-bottom: 21px;

  font-weight: 700;
  font-size: 15px;
  line-height: 125%;
  color: #000000;

  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;

  p {
    margin-left: 10px;
    font-weight: 400;
    font-size: 13px;
    line-height: 14px;
    color: #000000;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const UtilityGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-right: 20px;

    img:nth-child(1) {
      margin-left: -3px;
    }

    > p {
      font-weight: 400;
      font-size: 13px;
      line-height: 14px;
      color: #000000;
      margin-left: 7px;

      &:nth-child(1) {
        margin-left: 10px;
      }
    }
  }
`;

const VisualIcon = styled.img`
  width: 54px;
  height: 56px;
  position: absolute;
  top: 25px;
  right: 29px;
`;

const VisualIconBg = styled.div`
  width: 44px;
  height: 44px;
  position: absolute;
  top: 40px;
  right: 17px;
  background: #e47b00;
  border-radius: 22px;
`;
