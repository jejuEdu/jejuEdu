import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

import AddressInput from "../../components/maps/AddressInput";
import StudyCard from "../../components/StudyCard";
// import Titlebar from "../../components/Titlebar.js";
import LayoutMainPage from "../../layouts/LayoutMainPage";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Main() {
  const [category, setCategory] = useState("code");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudyList = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/getStudyList/${category}`);
      setList(response.data.studyList);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  useEffect(() => {
    getStudyList(category);
  }, [category]);

  return (
    <LayoutMainPage>
      <MainContainer>
        <AddressInput update={setList} />
        {loading ? (
          <LoadingSpinner height="50vh" />
        ) : (
          <ItemListContainer>
            {list.map((el, idx) => {
              return (
                <Link
                  className="ItemDetailLink"
                  to={`/detail/partydetail/${el.study_no}`}
                  key={idx}
                >
                  <StudyCard item={el} />
                </Link>
              );
            })}
          </ItemListContainer>
        )}
      </MainContainer>
    </LayoutMainPage>
  );
}

const MainContainer = styled.div`
  padding-top: 30px;
  /* margin-bottom: 80px; */
  overflow: hidden;
  width: 100%;
  height: 75vh;
`;

const ItemListContainer = styled.div`
  overflow-y: scroll;
  height: 90%;
  padding: 10px 0 50px 0;

  &::-webkit-scrollbar {
    display: none;
  }

  .ItemDetailLink {
    display: block;
    border-bottom: 1px solid black;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
`;
