import React from "react";
import styled from "styled-components";
import Contact from "./Contact";
import Post from "./Post";

const Home = () => {
  return (
    <Container>
      <Sections>
        {/* Post */}
        <Post />
      </Sections>
      <Section>
        <div>
          <Contact />
        </div>
      </Section>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    max-width: 72rem;
  }
  @media (min-width: 640px) {
    max-width: 48rem;
  }
  @media (min-width: 1280px) {
    max-width: 80rem;
  }
  margin: 0 auto;
`;

const Sections = styled.div`
  grid-column: span 2 / span 2;
  margin: 0 auto;
`;

const Section = styled.div`
  display: none;
  @media (min-width: 1280px) {
    display: inline-grid;
    position: fixed;
    right: 1px;
  }
  @media (min-width: 768px) {
    grid-column: span 1 / span 1;
  }
`;
