Rails.application.routes.draw do
  resources :links, only: [:index, :create, :update], param: :slug
  get '/:slug', to: 'links#show'
  root "home#index"
  get '*path', to: 'home#index', via: :all
end
