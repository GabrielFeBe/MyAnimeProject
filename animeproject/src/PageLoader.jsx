import React from 'react';
import { HashLoader } from 'react-spinners';

export default function PageLoader() {
  return (
    <div
      style={ {
        flexDirection: 'column',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center' } }
    >
      <h1
        style={ { padding: '5px', marginBottom: '10px', color: '#8257e5',
        } }
      >
        Loading...

      </h1>
      <HashLoader
        color="#8257e5"
        cssOverride={ { margin: '0 auto' } }
        size={ 150 }
        aria-label="Loading Spinner"
        data-testid="HashLoader"
      />
    </div>
  );
}
