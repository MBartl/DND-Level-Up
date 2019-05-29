class Api::V1::AbilityScoresController < ApplicationController

  def create
    @ability_score = AbilityScore.create(ability_score_params)
    if @ability_score.save
      render json: @ability_score
    else
      render :new
    end
  end

  private
  def ability_score_params
    params.require(:ability_score).permit(:strength, :dexterity, :constitution, :intelligence, :wisdom, :charisma)
  end
end
