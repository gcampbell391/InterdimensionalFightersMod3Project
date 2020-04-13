Rails.application.routes.draw do
  resources :battle_stages
  resources :attacks
  resources :enemies
  resources :heros
  resources :games
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
