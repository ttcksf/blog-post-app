import React from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Avatar } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPhoto,
  setLogIn,
} from "../features/User/userSlice";
import { selectStarter, setStarter } from "../features/Boolean/boolSlice";

const Header = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const photo = useSelector(selectPhoto);
  const starter = useSelector(selectStarter);

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      console.log("user:", user);
      dispatch(
        setLogIn({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    });
  };

  const Make = () => {
    if (starter) {
      dispatch(setStarter({ starter: false }));
    } else {
      dispatch(setStarter({ starter: true }));
    }
  };
  return (
    <Container>
      <Wrapper>
        <Logo>
          <span>Social</span>
        </Logo>
        <RightContainer>
          {name ? (
            <>
              <PlusContainer>
                <AddIcon onClick={Make} />
              </PlusContainer>
              <User>
                <Avatar src={photo} />
              </User>
            </>
          ) : (
            <Button onClick={signIn}>Sign In</Button>
          )}
        </RightContainer>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  position: sticky;
  z-index: 9999;
  top:0;
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 6px -1px; rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.6);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px;
  width: 100%;
  @media (min-width: 1024px) {
    max-width: 72rem;
    margin: 0 auto;
  }
`;

const Logo = styled.div`
  span {
    font-family: "Mochiy Pop One", sans-serif;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const User = styled.div`
  margin-left: 10px;
  cursor: pointer;
  transition: all 150ms ease-out;
  :hover {
    opacity: 0.75;
  }
`;

const PlusContainer = styled.div`
  border: 5px solid rgba(107, 114, 128, 1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  transition: all 150ms ease-out;
  svg {
    color: rgba(107, 114, 128, 1);
    font-size: 20px;
  }

  :hover {
    border-color: rgba(37, 99, 235, 1);
    svg {
      color: rgba(37, 99, 235, 1);
    }
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  color: white;
  background-color: rgba(59, 130, 246, 1);
  cursor: pointer;
`;
