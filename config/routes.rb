Rails.application.routes.draw do

  get "/" => "application#index"

  get "/beds" => "beds#index"
  get "/beds/:id" => "beds#show"

end
