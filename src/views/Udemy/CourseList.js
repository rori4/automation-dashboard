import React, { Component } from 'react'
import ProductSearch from '../../components/Searches/ProductSearch';
import CourseService from './../../services/course-service';

export default class CourseList extends Component {
  static courseService = new CourseService();
  render() {
    return (
      <ProductSearch service={CourseList.courseService} headerText="My Udemy Courses"></ProductSearch>
    )
  }
}
