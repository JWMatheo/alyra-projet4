import { useState } from 'react';
import styled from 'styled-components';
import { Heading, SearchBar } from '../components';
import { Section } from '../components/style';

export default function explore() {
  return (
    <>
      <Heading
        image="https://medhaavi.in/wp-content/uploads/2022/01/featured-image-anime-character-810x456.jpg"
        title="Explore"
      />
      <Section>
        <SearchBar />
      </Section>
    </>
  );
}
