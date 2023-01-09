import React, { useEffect, Suspense } from 'react';
import { Route, Routes, useNavigate, useNavigationType, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { RouterConfig } from './RouteConfig';

import LoadingSpinner from './components/LoadingSpinner';

import './reset.css';
import './app.css';
import './font.css';
import './slideTransition.css';
import { savePathname } from './store/pathnameSlice';
import ErrorPage from './page/Error';

let oldLocation = null;

const DEFAULT_SCENE_CONFIG = {
  enter: 'from-bottom',
  exit: 'to-bottom',
};

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigationType = useNavigationType();
  const location = useLocation();

  useEffect(() => {
    let pathname = location.pathname;
    pathname === '/' ? navigate('/home', { replace: true }) : navigate(pathname, { replace: true });

    dispatch(savePathname({ pathname }));
  }, []);

  const getSceneConfig = (location) => {
    const matchedRoute =
      location &&
      RouterConfig.find((config) => new RegExp(`^${config.path}$`).test(location.pathname));

    return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG;
  };

  let classNames = '';

  if (navigationType === 'PUSH' || navigationType === 'REPLACE') {
    classNames = 'forward-' + getSceneConfig(location).enter;
  } else if (navigationType === 'POP') {
    classNames = 'back-' + getSceneConfig(oldLocation).exit;
  }

  oldLocation = location;

  return (
    <TransitionGroup
      className={'router-wrapper'}
      childFactory={(child) => React.cloneElement(child, { classNames })}
    >
      <CSSTransition timeout={300} key={location.pathname}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location}>
            {RouterConfig.map((config, index) => {
              return <Route key={index} {...config} />;
            })}
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
