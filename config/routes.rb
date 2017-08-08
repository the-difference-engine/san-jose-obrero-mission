Rails.application.routes.draw do

  get "/" => "application#index"

  get "/beds" => "beds#index"

end
