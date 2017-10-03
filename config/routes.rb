Rails.application.routes.draw do


  get "/residents" => "residents#index"
  get "/residents/new" => "residents#new"
  post "/residents" => "residents#create"
  get "/residents/:id" => "residents#show"
  get "/residents/:id/edit" => "residents#edit"
  patch "/residents/:id" => "residents#update"
  delete "/residents/:id" => "residents#destroy" 



  get "/beds" => "beds#index"
  get "/beds/:id" => "beds#show"
  get "/beds/:id/edit" => "beds#edit"
  patch "/beds/:id" => "beds#update"

  get "/signup" => "users#new"
  post "/users" => "users#create"

  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy"

  # API End Points
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :users, only: [:index, :create, :show, :update, :destroy]
    end
  end

end
