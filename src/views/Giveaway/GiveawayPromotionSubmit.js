import React, { Component } from "react";
import PromotionForm from "../../components/Forms/PromotionForm";
import PromotionService from '../../services/promotion-service';

export default class GiveawayPromotionSubmit extends Component {
  static promotionService = new PromotionService("giveaway");
  constructor(props) {
    super(props);
    this.selectOptions = ["webSite3", "webSite4", "webSite5", "webSite6"];
  }

  render() {
    return (
      <PromotionForm
        service={GiveawayPromotionSubmit.promotionService}
        urlAfterSubmit="/giveaways/promote"
        selectOptions={this.selectOptions}
        type="giveaway"
        {...this.props}
      />
    );
  }
}
