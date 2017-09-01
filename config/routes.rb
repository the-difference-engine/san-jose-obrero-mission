Rails.application.routes.draw do

  get "/" => "pages#index" 

  get "/residents" => "residents#index"
  get "/residents/new" => "residents#new"
  post "/residents" => "residents#create"
  get "/residents/:id" => "residents#show"
  get "/residents/:id/edit" => "residents#edit"
  patch "/residents/:id" => "residents#update"
  delete "/residents/:id" => "residents#destroy" 


  get "/" => "application#index"

  get "/beds" => "beds#index"
  get "/beds/:id" => "beds#show"
  get "/beds/:id/edit" => "beds#edit"
  patch "/beds/:id" => "beds#update"

  get "/signup" => "users#new"
  post "/users" => "users#create"

  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy"


end
