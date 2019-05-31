class Api::V1::CharacterCampaignsController < ApplicationController
  def index
    @character_campaigns = CharacterCampaign.all
    render json: @character_campaigns
  end

  def create
    @character_campaign = CharacterCampaign.create(char_campaign_params)
    render json: @character_campaign
  end

  def destroy
    @character_campaign = CharacterCampaign.find(params[:id])
    @character_campaign.destroy
    render json: @character_campaign
  end

  private
  def char_campaign_params
    params.require(:character_campaign).permit(:campaign_id, :character_id)
  end
end
