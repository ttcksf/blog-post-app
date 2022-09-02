import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectName, selectPhoto, setLogOut } from "../features/User/userSlice";
import { auth } from "../firebase";

const Contact = () => {
  const name = useSelector(selectName);
  const photo = useSelector(selectPhoto);
  const shortName = name?.split(" ");
  const dispatch = useDispatch();
  const LogOut = () => {
    signOut(auth, (result) => {
      dispatch(
        setLogOut({
          name: null,
          email: null,
          photo: null,
        })
      );
    });
  };

  return (
    <Container>
      <Header>
        <Avatar src={photo} />
        {/* <span>Hello {name ? shortName[0] : "Guest"}</span> */}
        <p onClick={LogOut}>LogOut</p>
      </Header>
    </Container>
  );
};

export default Contact;

const Container = styled.div`
  width: 382px;
  height: 231px;
  margin-right: 10px;
  background-color: white;
  margin-top: 10px;
  border-radius: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;

  margin: 20px 5px;
  padding-top: 20px;
  span {
    font-family: "Poppins", sans-serif;
    margin-left: 0.5rem;
    flex: 1;
  }
  svg{
    margin-left: 10px;
    cursor: pointer;
    transition: all 150ms ease-out;
    :hover {
      opacity: 0.75;
    }
  }
  p{
    padding: 0 5px;
    color: #60a5fa:
    font-weight: bold;
    cursor: pointer;
    :hover{
      text-decoration: underline;
    }
  }
`;
