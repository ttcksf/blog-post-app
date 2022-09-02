import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectEmail, selectName } from "../features/User/userSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

const Posts = ({ title, photo, caption, email, id, img }) => {
  const [cards, setCards] = useState(false);
  const emails = useSelector(selectEmail);
  const name = useSelector(selectName);
  const Delete = async () => {
    setCards(false);
    if (title === name || email === emails) {
      await deleteDoc(doc(db, "post", id));

      const desertRef = ref(storage, `post/${id}/image`);
      deleteObject(desertRef)
        .then(() => {
          alert("this post has successfully been deleted");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };
  return (
    <Container>
      <Header>
        <List>
          <Avatar src={photo} />
          <span>{title}</span>
        </List>
        <RightContainer>
          <MoreHorizIcon
            style={{ cursor: "pointer" }}
            onClick={() => setCards(true)}
          />
          <CardListContainer show={cards}>
            <div>
              <span onClick={Delete}>
                Delete <DeleteIcon />
              </span>
            </div>
          </CardListContainer>
        </RightContainer>
      </Header>
      <Post>
        <img src={img} alt="post" />
      </Post>
      <Caption>
        <span>{title}</span> : <p>{caption}</p>
      </Caption>
    </Container>
  );
};

export default Posts;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 714px;
  margin: 10px 0;
  border-radius: 4px;
  padding: 15px 0;
  @media (min-width: 1024px) {
    margin-top: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const List = styled.div`
  display: flex;
  align-items: center;
  span {
    font-family: "Poppins", sans-serif;
    margin-left: 10px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Post = styled.div`
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const Caption = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-top: 5px;

  span {
    margin-left: 5px;
    font-family: "Poppins", sans-serif;
    margin-right: 3px;
  }
  p {
    margin-left: 5px;
    font-weight: 600;
    font-size: small;
    color: gray;
  }
`;

const CardListContainer = styled.div`
  position: absolute;
  z-index: 999;
  background-color: white;
  bottom: -80px;
  left: -30px;
  width: 150px;
  height: 100px;
  border-radius: 4px;
  display: ${(props) => (props.show ? "block" : "none")};
  transition: all 150ms ease-out;
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    transition: all 150ms ease-out;
    color: lightgray;
    display: flex;
    align-items: center;
    cursor: pointer;
    :hover {
      color: red;
    }
  }
`;
