class Api::V1::CharactersController < ApplicationController
  def index
    @characters = Character.all
    if @characters
      render json: @characters
    end
  end

  def show
    @character = Character.find(params[:id])
    render json: @character
  end
end
