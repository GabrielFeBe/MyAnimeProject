import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchPageLetters({ arraySearch, type }) {
  return (
    <div style={ { margin: '0 auto', width: '1500px' } }>

      { arraySearch.length > 0 && (
        <table
          style={ {
            maxWidth: '1450px',
            width: '1450px',
            marginLeft: '25px',
            marginRight: '25px' } }
        >
          <thead>
            <tr>
              <th style={ { width: '50px' } }> </th>
              <th style={ { width: '100%' } }>Title</th>
              <th style={ { width: '50px' } }>Type</th>
              {type === 'manga' && <th style={ { width: '50px' } }>Vol.</th>}
              <th style={ { width: '50px' } }>Score</th>
            </tr>
          </thead>
          <tbody>

            {arraySearch.map((anime) => {
              const { score, type: iType, title, synopsis, mal_id: malId, images:
               { jpg: { image_url: image } } } = anime;
              let sinopse = '';
              if (synopsis) {
                const textSplit = synopsis.split(' ');
                const textSlice = textSplit.slice(0, 50);
                sinopse = textSlice.join(' ');
              }
              return (

                <tr key={ malId }>
                  <td>
                    <Link
                      to={ type === 'manga'
                        ? { pathname: `/mangapage/${title}`, state: { anime } }
                        : { pathname: `/animepage/${title}`, state: { anime } } }
                    >
                      <img
                        src={ image }
                        style={ { width: '50px', height: '72px' } }
                        alt=""
                      />
                    </Link>
                  </td>
                  <td
                    style={ { display: 'flex',
                      flexFlow: 'column',
                      textAlign: 'start',
                      fontSize: '13px' } }
                  >
                    <p style={ { marginBottom: '5px' } }>{title}</p>
                    <p>
                      {sinopse}
                    </p>

                  </td>
                  <td>
                    <p
                      style={ { fontSize: '13px', width: '50px' } }
                    >
                      {iType}
                    </p>

                  </td>
                  {type === 'manga' && (
                    <td>
                      <p
                        style={ { fontSize: '13px', width: '40px' } }
                      >
                        { anime.volumes || '.'}
                      </p>

                    </td>)}
                  <td>
                    <p style={ { fontSize: '13px', width: '50px' } }>

                      {score || '-'}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
