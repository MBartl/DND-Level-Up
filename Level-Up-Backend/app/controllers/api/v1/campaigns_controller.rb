class Api::V1::CampaignsController < ApplicationController
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

  private
  def campaign_params
    params.require(:campaign).permit(:name, :plot_notes)
  end
end
