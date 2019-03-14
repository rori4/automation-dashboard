import React, { Component } from "react";
import PromotionForm from "../../components/Forms/PromotionForm";
import PromotionService from '../../services/promotion-service';

export default class CoursePromotionSearch extends Component {
  static promotionService = new PromotionService("course");
  constructor(props) {
    super(props);
    this.selectOptions = ["webSite3", "webSite4", "webSite5", "webSite6"];
  }

  render() {
    return (
      <PromotionForm
        service={CoursePromotionSearch.promotionService}
        urlAfterSubmit="/courses/promote"
        selectOptions={this.selectOptions}
        type="course"
        {...this.props}
      />
    );
  }
}
