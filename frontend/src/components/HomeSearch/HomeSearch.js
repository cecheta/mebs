import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './HomeSearch.scss';

const HomeSearch = ({ suggestions }) => {
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState(null);

  const history = useHistory();

  const counter = useRef(0);
  const nodeRef = React.useRef(null);

  const nextSuggestion = useCallback(() => {
    setSuggestion(suggestions[counter.current]);
    counter.current++;
    if (counter.current === suggestions.length) {
      counter.current = 0;
    }
  }, [suggestions]);

  useEffect(() => {
    if (suggestions.length > 0) {
      nextSuggestion();
    }
  }, [suggestions, nextSuggestion]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      nextSuggestion();
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [suggestion, suggestions, nextSuggestion]);

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (query) {
      history.push(`/search?q=${encodeURIComponent(query)}&type=all`);
    }
  };

  const suggestionText = suggestion ? suggestion : '...';

  return (
    <div className="HomeSearch">
      <h1 className="HomeSearch__Title">Mebs</h1>
      <form className="HomeSearch__Form" onSubmit={submitHandler}>
        <div className="HomeSearch__Search">
          <input className="HomeSearch__Input" type="text" name="query" value={query} onChange={queryChangeHandler} />
          {!query ? (
            <div className="HomeSearch__Placeholder">
              <span>Search for </span>
              <SwitchTransition className="HomeSearch__Placeholder">
                <CSSTransition
                  nodeRef={nodeRef}
                  timeout={{
                    enter: 300,
                    exit: 100,
                  }}
                  key={suggestionText}
                >
                  <span className="HomeSearch__Placeholder--Suggestion" ref={nodeRef}>
                    {suggestionText}
                  </span>
                </CSSTransition>
              </SwitchTransition>
            </div>
          ) : null}
        </div>
        <button className="HomeSearch__Submit">Search</button>
      </form>
    </div>
  );
};

export default HomeSearch;
