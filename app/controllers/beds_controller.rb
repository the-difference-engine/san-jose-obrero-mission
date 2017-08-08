class BedsController < ApplicationController

  def index
    @beds = Bed.all
    render "index.html.erb"
  end
end
