class CharactersController < ApplicationController

  def index
    @characters = Character.all
  end

  def campaign_index
    @characters = Character.filter_campaign_characters
    render json: @characters
  end

  def create
    @character = Character.new(character_params)
    if @character.save
      render json: @character
    else
      render :new
    end
  end

  def show
      @campaign = Character.find(params[:id])
      render json: @character
  end
end

private

def character_params
  params.require(:character).permit(:name, :bio, :level, :ability_score, :race_id, :char_class_id, :subclass_id, :campaign_id)
end
