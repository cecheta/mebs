import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './HomeSearch.scss';

const HomeSearch = ({ suggestions }) => {
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState(null);

  const history = useHistory();

  const nodeRef = React.useRef(null);

  const randomSuggestion = useCallback((suggestions) => {
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }, []);

  useEffect(() => {
    setSuggestion(randomSuggestion(suggestions));
  }, [suggestions, randomSuggestion]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let newSuggestion = randomSuggestion(suggestions);
      while (newSuggestion === suggestion) {
        newSuggestion = randomSuggestion(suggestions);
      }

      setSuggestion(newSuggestion);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [suggestion, suggestions, randomSuggestion]);

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
