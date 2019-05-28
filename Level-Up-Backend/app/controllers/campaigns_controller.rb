class CampaignsController < ApplicationController

  def index
    @campaigns = Campaign.all
    render json: @campaigns
  end

  def create
    @campaign = Campaign.new(campaign_params)
    if @campaign.save
      redirect_to @campaign
    else
      render :new
    end
  end
end
