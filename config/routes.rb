Rails.application.routes.draw do

  get "/" => "application#index"

  get "/beds" => "beds#index"
  get "/beds/:id" => "beds#show"
  get "/beds/:id/edit" => "beds#edit"
  patch "/beds/:id" => "beds#update"

end
