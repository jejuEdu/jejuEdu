import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// import ProfileDetail from "./ProfileDetail";
import { HiLocationMarker } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";

import LayoutMainPage from "../../layouts/LayoutMainPage.js";

export default function Profile() {
  const [selected, setSelected] = useState("join");
  const [studyList, setStudyList] = useState([]);

  let user_No = useSelector((state) => {
    return state.user.user_no;
  });

  const handleJoin = () => {
    axios.get(`/api/getStudyListNotMine/${user_No}`).then((res) => {
      setStudyList(res.data.studyListNotMine);
      setSelected("join");
    });
  };

  const handleCreate = () => {
    axios.get(`/api/getStudyListMine/${user_No}`).then((res) => {
      setStudyList(res.data.studyListMine);
      setSelected("create");
    });
  };

  const handleImage = (num) => {
    switch (Math.floor(num / 4)) {
      case 1:
        return "대기";
      case 2:
        return "실패";
      case 3:
        return "매칭";
      default:
        return "대기";
    }
  };

  useEffect(() => {
    handleJoin();
  }, []);

  return (
    <LayoutMainPage>
      <MainContainer>
        <p className="myProfile">My page</p>
        <div className="pageBtn">
          {/* 상단의 Page 바꾸는 버튼 */}
          <div
            className={selected === "join" ? "changeStyle" : "base"}
            onClick={handleJoin}
          >
            참여
          </div>
          <div
            className={selected === "create" ? "changeStyle" : "base"}
            onClick={handleCreate}
          >
            개설
          </div>
        </div>
        <ListContainer>
          {studyList.map((el, idx) => {
            return (
              <ListWrapper key={idx}>
                <Link
                  to={`/partyDetail/${el.study_no}`}
                  className="LinkWrapper"
                >
                  <WrapperHeader>
                    <p className="headerUserName">{el.who_open}</p>
                    <div className="headerStatus">
                      {handleImage(el.study_no)}
                    </div>
                  </WrapperHeader>
                  <div className="listTitle">{el.study_title}</div>
                  <LocationPeople>
                    <LocationContainer>
                      <HiLocationMarker />
                      <p>place</p>
                      <p>{el.studyAt_location}</p>
                    </LocationContainer>
                    <PeopleContainer>
                      <MdPeopleAlt />
                      <p className="peopleData">
                        {el.study_no}/{el.min_member_cnt}
                      </p>
                    </PeopleContainer>
                  </LocationPeople>
                </Link>
              </ListWrapper>
            );
          })}
        </ListContainer>
      </MainContainer>
    </LayoutMainPage>
  );
}

const LocationPeople = styled.div`
  width: 100%;
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 47%;
`;

const PeopleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 13%;
`;

const ListWrapper = styled.div`
  width: 90%;
  padding: 12px;
  margin: 20px 23px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4ede7;
  border-radius: 7px;

  .listTitle {
    width: 100%;
    text-align: left;
    font-size: 23px;
    font-weight: bold;
  }

  .LinkWrapper {
    display: block;
    width: 100%;
    height: auto;
  }
`;

const WrapperHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .headerUserName {
    font-size: 15px;
  }

  .headerStatus {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 27px;
    border-radius: 8px;
    transform: translateY(10px);

    background-color: black;
    color: white;
  }
`;

const MainContainer = styled.section`
  padding-top: 30px;
  background-color: white;
  .pageBtn {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
  }
  .base {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 25px;
    background-color: #f4ede7;
    color: black;
    font-weight: 600;
  }
  .changeStyle {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 25px;

    background-color: black;
    color: white;
  }

  .myProfile {
    text-align: center;
    width: 90%;
    margin: 0 20px;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 11px;
    margin-bottom: 20px;
  }
`;

const ListContainer = styled.section`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid red; */
`;
