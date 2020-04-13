Rails.application.routes.draw do
  resources :battle_stages
  resources :attacks
  resources :enemies
  resources :heros
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
