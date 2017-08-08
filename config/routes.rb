Rails.application.routes.draw do

  get "/" => "application#index" 

  get "/residents" => "residents#index"
  get "/residents/new" => "residents#new"
  post "/residents" => "residents#create"
  get "/residents/:id" => "residents#show"
  get "/residents/:id/edit" => "residents#edit"
  patch "/residents/:id" => "residents#update"
  delete "/residents/:id" => "residents#destroy" 

end
