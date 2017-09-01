class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception 

  def index
    render html: "lets test this thing out"
  end 

end
