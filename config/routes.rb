Rails.application.routes.draw do


  # root "static_pages#landing"
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
  get "/users" => "users#index"
  post "/users" => "users#create"
  get "/users" => "users#index"

  get "" => "sessions#new"
  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy"

 

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :residents, only: [:index, :create, :show, :update, :destroy]
      resources :beds, only: [:index, :create, :show, :update, :destroy]
      resources :users, only: [:index, :create, :show, :update, :destroy]
    end
  end
end
