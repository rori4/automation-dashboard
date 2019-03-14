import React from 'react';
import DefaultLayout from './layouts/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
//BOOKS
const Book = React.lazy(() => import('./views/Amazon/Book'));
const BookList = React.lazy(() => import('./views/Amazon/BookList'));
const BookPromotionSubmit = React.lazy(() => import('./views/Amazon/BookPromotionSubmit'));
const BookPromotionSearch = React.lazy(() => import('./views/Amazon/BookPromotionSearch'));
//COURSES
const Course = React.lazy(() => import('./views/Udemy/Course'));
const CourseList = React.lazy(() => import('./views/Udemy/CourseList'));
const CoursePromotionSubmit = React.lazy(() => import('./views/Udemy/CoursePromotionSubmit'));
const CoursePromotionSearch = React.lazy(() => import('./views/Udemy/CoursePromotionSearch'));
//GIVEAWAYS
const Giveaway = React.lazy(() => import('./views/Giveaway/Giveaway'));
const GiveawayList = React.lazy(() => import('./views/Giveaway/GiveawayList'));
const GiveawayPromotionSubmit = React.lazy(() => import('./views/Giveaway/GiveawayPromotionSubmit'));
const GiveawayPromotionSearch = React.lazy(() => import('./views/Giveaway/GiveawayPromotionSearch'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
//BOOK SECTION PATHS
  { path: '/books/add', name: 'Add Kindle Book', component: Book },
  { path: '/books/edit/:id', name: 'Edit Kindle Book', component: Book },
  { path: '/books/list', name: 'My Kindle Books', component: BookList },
  { path: '/books/promote/:parentId', name: 'Kindle Book Promotion', component: BookPromotionSubmit },
  { path: '/books/promote', name: 'My Book Promotions', component: BookPromotionSearch },
//COURSES SECTION PATHS
  { path: '/courses/add', name: 'Add Udemy Course', component: Course },
  { path: '/courses/edit/:id', name: 'Edit Udemy Course', component: Course },
  { path: '/courses/list', name: 'My Udemy Courses', component: CourseList },
  { path: '/courses/promote/:parentId', name: 'Course Promotion', component: CoursePromotionSubmit },
  { path: '/courses/promote', name: 'My Courses Promotions', component: CoursePromotionSearch },
//GIVEAWAY SECTION PATHS
  { path: '/giveaways/add', name: 'Add Giveaway', component: Giveaway },
  { path: '/giveaways/edit/:id', name: 'Add Giveaway', component: Giveaway },
  { path: '/giveaways/list', name: 'Add Giveaway', component: GiveawayList },
  { path: '/giveaways/promote/:parentId', name: 'Giveaway Promotion', component: GiveawayPromotionSubmit },
  { path: '/giveaways/promote', name: 'My Giveaway Promotions', component: GiveawayPromotionSearch },
];

export default routes;
