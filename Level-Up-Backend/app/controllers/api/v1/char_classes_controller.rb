class Api::V1::CharClassesController < ApplicationController

  def index
    @char_classes = CharClass.all
    render json: @char_classes
  end

  def show
    @char_class = CharClass.find(params[:id])
    render json: @char_class
  end
end
