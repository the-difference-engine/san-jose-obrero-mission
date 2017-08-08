Rails.application.routes.draw do


  get "/" => "application#index" 

  get "/residents" => "residents#index"
  get "/residents/new" => "residents#new"
  post "/residents" => "residents#create"
  get "/residents/:id" => "residents#show"
  get "/residents/:id/edit" => "residents#edit"
  patch "/residents/:id" => "residents#update"
  delete "/residents/:id" => "residents#destroy" 

  devise_for :residential_aids, path: 'residential_aids'
  devise_for :securities, path: 'securities'
  devise_for :case_managers, path: 'case_managers'
  get "/" => "application#index"

  get "/beds" => "beds#index"
  get "/beds/:id" => "beds#show"
  get "/beds/:id/edit" => "beds#edit"
  patch "/beds/:id" => "beds#update"

end
