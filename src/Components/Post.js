import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Posts from "./Posts";

const Post = () => {
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "post"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setSelected(snapshot.docs);
      }
    );
  }, []);
  return (
    <Container>
      {selected.map((profile) => (
        <Posts
          key={profile?.id}
          id={profile?.id}
          title={profile?.data().name}
          photo={profile?.data().photo}
          caption={profile?.data().caption}
          email={profile?.data().email}
          img={profile?.data().Image}
        />
      ))}
    </Container>
  );
};

export default Post;

const Container = styled.div``;
