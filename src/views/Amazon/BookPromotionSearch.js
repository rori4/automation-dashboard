import React, { Component } from "react";
import PromotionSearch from "./../../components/Searches/PromotionSearch";
import PromotionService from './../../services/promotion-service';

export default class BookPromotionSearch extends Component {
  constructor(props) {
    super(props);
    this.service = new PromotionService("book");
  }

  render() {
    return (
      <PromotionSearch
        service={this.service}
        headerText="Book Promotions"
        type="book"
        {...this.props}
      />
    );
  }
}
