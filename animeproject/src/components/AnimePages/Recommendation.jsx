import React, { useEffect, useState } from 'react';
import PageLoader from '../../PageLoader';
import Footer from '../Footer';
import Header from '../Header';
import './Recommendation.css';

export default function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [paginatioStats, setPaginationStats] = useState();
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/recommendations/anime?pagination=${pagination}`);
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setRecommendations(data.data);
      setPaginationStats(data.pagination);
    };
    fetchReviews();
  }, [pagination]);
  if (loading) return <PageLoader />;
  return (
    <div>
      <Header />
      Recommendation
      {!loading && recommendations.map((recommendation) => {
        const { mal_id: malId, entry, content, user: { username, url } } = recommendation;
        const ifULiked = entry[0];
        const thenYouMightLike = entry[1];
        const { images: { jpg: uLiked }, title: likedTitle, url: likeUrl } = ifULiked;
        const { images: { jpg: mightLike }, title: mightTitle,
          url: mightLikeUrl } = thenYouMightLike;
        return (
          <div key={ malId } className="recBox">
            <div className="recommendationContainer">
              <div className="imgContainerRec">
                <img src={ uLiked.image_url } alt="" className="imgRecs" />
                <div>
                  If you liked
                  <br />
                  <a href={ likeUrl } className="title">{likedTitle}</a>
                </div>
              </div>
              <div className="imgContainerRec">
                <img src={ mightLike.image_url } alt="" className="imgRecs" />
                <div>
                  ...then you might like
                  <br />
                  <a className="title" href={ mightLikeUrl }>{mightTitle}</a>
                </div>
              </div>
            </div>
            <p className="recContent">{content}</p>
            <p className="recUserLink">
              Anime rec by
              {' '}
              <a href={ url } className="recLink">{username}</a>
            </p>
          </div>
        );
      })}
      { !loading && (
        <button
          className="searchAnimNxtPrevButton"
          disabled={ pagination === 1 }
          onClick={ () => {
            handleScrollToTop();
            if (pagination > 1) {
              const count = pagination - 1;
              setPagination(count);
            }
          } }
        >
          &#8249;
        </button>)}
      {!loading && <p className="currPage">{pagination}</p>}
      { !loading && (
        <button
          className="searchAnimNxtPrevButton"
          disabled={ !paginatioStats.has_next_page }
          onClick={ () => {
            const count = pagination + 1;
            setPagination(count);
          } }
        >
          &#8250;
        </button>) }
      <Footer />
    </div>
  );
}
