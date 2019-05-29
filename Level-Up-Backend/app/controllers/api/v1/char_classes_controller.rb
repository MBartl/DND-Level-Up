class Api::V1::CharClassesController < ApplicationController

  def index
    @char_classes = CharClasses.all
    render json: @char_classes
  end
end
