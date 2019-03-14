import React, { Component } from "react";
import PromotionSearch from "../../components/Searches/PromotionSearch";
import PromotionService from '../../services/promotion-service';

export default class GiveawayPromotionSearch extends Component {
  constructor(props) {
    super(props);
    this.service = new PromotionService("giveaway");
  }

  render() {
    return (
      <PromotionSearch
        service={this.service}
        headerText="Givewaway Promotions"
        type="giveaway"
        {...this.props}
      />
    );
  }
}
