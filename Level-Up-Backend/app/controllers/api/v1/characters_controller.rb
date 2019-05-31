class Api::V1::CharactersController < ApplicationController

  def index
    @characters = Character.all.map do |character|
      {
        id: character.id,
        name: character.name,
        bio: character.bio,
        level: character.level,
        char_class: character.char_class.name,
        race: character.race.name,
        character_campaigns: character.character_campaigns,
        ability_score: character.ability_score,
        skills: character.skills
      }
    end
    @characters = Character.all
    render json: @characters
  end

  def campaign_index
    @characters = Character.filter_campaign_characters
    render json: @characters
  end

  def create
    @character = Character.create(character_params)
    render json: @character
  end

  def show
    find_character
    render json: @character
  end

  def update
    byebug
    find_character.update(character_params)
    render json: @character
  end

  private
  def character_params
    params.require(:character).permit(:name, :bio, :level, :ability_score, :race_id, :char_class_id, :subclass_id, :campaign_id)
  end

  def find_character
    @character = Character.find(params[:id])
  end
end
