import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './NotFound.styles';

export default function NotFound() {
  return (
    <Container>
      <h1>Ups... Etwas ist schief gelaufen</h1>
      <p>
        <Link to="/">Weiter zur Startseite</Link>
      </p>
    </Container>
  );
}
