import React from 'react';
import DefaultLayout from './layouts/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const AmazonAddBook = React.lazy(() => import('./views/Amazon/AddBook'));
const AmazonBookList = React.lazy(() => import('./views/Amazon/BookList'));
const UdemyAddCourse = React.lazy(() => import('./views/Udemy/AddCourse'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/books/add', name: 'Add Kindle Book', component: AmazonAddBook },
  { path: '/books/list', name: 'My Kindle Books', component: AmazonBookList },
  { path: '/courses/add', name: 'Add Udemy Courses', component: UdemyAddCourse },
];

export default routes;
