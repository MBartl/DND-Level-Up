class Api::V1::CampaignsController < ApplicationController

  def index
    @campaigns = Campaign.all.map do |campaign|
      {
        id: campaign.id,
        name: campaign.name,
        plot_notes: campaign.plot_notes
      }
    end
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

  def show
    @campaign = Campaign.all.find(params[:id])
    @campaign.characters.map do |character|
      {
        id: character.id,
        name: character.name,
        bio: character.bio,
        level: character.level,
        char_class: character.char_class.name,
        race: character.race.name
      }
    end
    render json: @campaign
  end

  private
  def campaign_params
    params.require(:campaign).permit(:name, :plot_notes)
  end
end
