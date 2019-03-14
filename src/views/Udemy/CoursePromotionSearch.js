import React, { Component } from "react";
import PromotionSearch from "../../components/Searches/PromotionSearch";
import PromotionService from '../../services/promotion-service';

export default class CoursePromotionSearch extends Component {
  constructor(props) {
    super(props);
    this.service = new PromotionService("course");
  }

  render() {
    return (
      <PromotionSearch
        service={this.service}
        headerText="Course Promotions"
        type="course"
        {...this.props}
      />
    );
  }
}
