import React from 'react';
import { Link } from 'react-router-dom';

export default function Aside(props) {
  const { animeArray, title: compTitle, loading } = props;
  if (loading) {
    return null;
  }
  return (
    <div className="AsideDiv" style={ { marginTop: '10px' } }>
      <h3 className="asideHeader">{compTitle}</h3>
      <div>
        {animeArray.map((anime, i) => {
          const { type, episodes, score,
            images: { jpg: { image_url: imageUrl } }, members, title } = anime;
          return (
            <div key={ anime.mal_id } className="asideBox">
              <p className="rankNumber">{i + 1}</p>
              <img src={ imageUrl } alt="" className="asideImg" />
              <div className="boxOfTitleAndStatus">
                <Link
                  to={ { pathname: `/animepage/${anime.title}`, state: { anime } } }
                  className="asideTitle"
                >
                  {title}

                </Link>
                <span>
                  {`${type}, ${episodes || 0} eps, socored ${score || 'N/A'}`}
                  <br />
                  {`${members.toLocaleString()} members`}
                </span>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
