import React from 'react';
import DefaultLayout from './layouts/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const AmazonBook = React.lazy(() => import('./views/Amazon/Book'));
const AmazonBookList = React.lazy(() => import('./views/Amazon/BookList'));
const UdemyCourse = React.lazy(() => import('./views/Udemy/Course'));
const UdemyCourseList = React.lazy(() => import('./views/Udemy/CourseList'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/books/add', name: 'Add Kindle Book', component: AmazonBook },
  { path: '/books/edit/:id', name: 'Edit Kindle Book', component: AmazonBook },
  { path: '/books/list', name: 'My Kindle Books', component: AmazonBookList },
  { path: '/courses/add', name: 'Add Udemy Course', component: UdemyCourse },
  { path: '/courses/edit/:id', name: 'Edit Udemy Course', component: UdemyCourse },
  { path: '/courses/list', name: 'My Udemy Courses', component: UdemyCourseList },
];

export default routes;
