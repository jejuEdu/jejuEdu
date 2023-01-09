import React from 'react';

const LayoutMainPage = React.lazy(() => import('./layouts/LayoutMainPage'));
const Main = React.lazy(() => import('./page/Main/Main'));
const Profile = React.lazy(() => import('./page/profile/Profile'));

const LayoutDetailPage = React.lazy(() => import('./layouts/LayoutDetailPage'));
const StudyCreate = React.lazy(() => import('./page/study/create'));
const StudyDetail = React.lazy(() => import('./page/study/detail'));
const Account = React.lazy(() => import('./page/account/Account'));
const Login = React.lazy(() => import('./page/login/Login'));
const Join = React.lazy(() => import('./page/Join'));
const ChangePw = React.lazy(() => import('./page/account/ChangePw'));
const ChangeNick = React.lazy(() => import('./page/account/ChangeNick'));
const Error = React.lazy(() => import('./page/Error'));


export const RouterConfig = [
  {
    path: '/',
    element: <LayoutMainPage />,
    sceneConfig: {
      enter: 'from-fade',
      exit: 'to-fade',
    },
  },
  {
    path: '/home',
    element: <Main />,
    sceneConfig: {
      enter: 'from-left',
      exit: 'to-left',
    },
  },
  {
    path: '/profile',
    element: <Profile />,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right',
    },
  },
  {
    path: '/detail',
    element: <LayoutDetailPage />,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
  {
    path: '/detail/partydetail/:id',
    element: <StudyDetail />,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
  {
    path: '/detail/partyjoin',
    element: <StudyCreate />,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
  {
    path: '/detail/account',
    element: <Account />,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
  {
    path: '/detail/login',
    element: <Login />,
    sceneConfig: {
      enter: 'from-fade',
      exit: 'to-fade',
    },
  },
  {
    path: '/detail/join',
    element: <Join />,
    sceneConfig: {
      enter: 'from-fade',
      exit: 'to-fade',
    },
  },
  {
    path: '/detail/changepw',
    element: <ChangePw />,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
  {
    path: '/detail/changenick',
    element: <ChangeNick />,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',

    },
  },
  {
    path: '/detail/error',
    element: <Error />,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom',
    },
  },
];
