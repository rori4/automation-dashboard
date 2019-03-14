import React, { Component } from "react";
import PromotionForm from "./../../components/Forms/PromotionForm";
import PromotionService from './../../services/promotion-service';

export default class BookPromotionSubmit extends Component {
  static promotionService = new PromotionService("book");
  constructor(props) {
    super(props);
    this.selectOptions = ["webSite1", "webSite2", "webSite3", "webSite4"];
  }

  render() {
    return (
      <PromotionForm
        service={BookPromotionSubmit.promotionService}
        urlAfterSubmit="/books/promote"
        selectOptions={this.selectOptions}
        type="book"
        {...this.props}
      />
    );
  }
}
