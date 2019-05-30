Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :campaigns, only: [:index, :show, :create]
      resources :characters, only: [:index]
      resources :races, only: [:index, :show]
      resources :ability_scores, only: [:show, :create]
      resources :characters, only: [:index, :show, :create]
      resources :char_classes, only: [:index, :show]
      # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    end
  end
end
