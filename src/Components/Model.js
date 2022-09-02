import React, { useRef, useState } from "react";
import styled from "styled-components";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPhoto,
} from "../features/User/userSlice";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { selectStarter, setStarter } from "../features/Boolean/boolSlice";

const Model = () => {
  const [input, setInput] = useState(null);
  const filepicker = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const name = useSelector(selectName);
  const photo = useSelector(selectPhoto);
  const email = useSelector(selectEmail);
  const starter = useSelector(selectStarter);
  const dispatch = useDispatch();
  const Submit = async (e) => {
    if (loading) return;
    setLoading(true);
    const docs = await addDoc(collection(db, "post"), {
      caption: input,
      name: name,
      photo: photo,
      email: email,
      timestamp: serverTimestamp(),
    });
    const image = ref(storage, `post/${docs.id}/image`);
    await uploadString(image, selected, "data_url").then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(image);
      await updateDoc(doc(db, "post", docs.id), {
        Image: downloadUrl,
      });
    });
    setInput("");
    setSelected(null);
    setLoading(false);
    dispatch(setStarter({ starter: false }));
  };

  const selectedPhoto = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      console.log(e);
      console.log(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        setSelected(readerEvent.target.result);
      };
    }
  };
  console.log(starter);
  return (
    <Container show={starter}>
      <Wrapper>
        <Header>
          {selected ? (
            <div className="container">
              <img
                src={selected}
                onClick={() => setSelected(null)}
                alt="selected"
              />
            </div>
          ) : (
            <Cameria>
              <CameraAltIcon onClick={() => filepicker.current.click()} />
            </Cameria>
          )}

          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            ref={filepicker}
            onChange={selectedPhoto}
            hidden
          />
        </Header>
        <Caption>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Captions"
          />
          <Button disabled={!selected} onClick={Submit} type="button">
            {loading ? "Starting" : "Submit"}
          </Button>
        </Caption>
      </Wrapper>
    </Container>
  );
};

export default Model;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  transform: ${(props) => (props.show ? "translate(0%)" : "translateY(-100%)")};
  transition: transform 150ms ease-out;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  z-index: 999;
  transition: all 300ms ease-out;
  border-radius: 20px;
  width: 400px;
`;

const Cameria = styled.div`
  height: 1.75rem !important;
  width: 1.5rem !important;
  color: rgba(228, 38, 38, 1);
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(1 minmax(0, 1fr));

  .container {
    width: 100%;
    img {
      width: 100%;
      object-fit: contain;
      cursor: pointer;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
  }
`;

const Caption = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 10px 0;
  margin: 30px;
  border-radius: 20px;
  border: none;
  background-color: rgba(239, 68, 68, 1);
  color: white;
  cursor: pointer;
`;

const Input = styled.input`
  font-weight: bold;
  font-size: 15px;
  margin: 0 10px;
  flex: 1;
  border: none;
  padding: 10px;
  text-align: center;
  :focus {
    outline: none;
  }
`;
