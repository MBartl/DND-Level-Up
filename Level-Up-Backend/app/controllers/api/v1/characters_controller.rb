class Api::V1::CharactersController < ApplicationController
  def index
    @characters = Character.all
    if @characters
      render json: @characters
    end
  end
end
