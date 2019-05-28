class CampaignsController < ApplicationController

  def index
    @campaigns = Campaign.all
    render json: @campaigns
  end

  def create
    @campaign = Campaign.new(campaign_params)
    if @campaign.save
      render json: @campaign
    else
      render :new
    end
  end
end

private

def campaign_params
  params.require(:campaign).permit(:name, :plot_notes)
end
