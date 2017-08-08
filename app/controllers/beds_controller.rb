class BedsController < ApplicationController

  def index
    @beds = Bed.all
    render "index.html.erb"
  end

  def show
    @bed = Bed.find_by(id: params[:id])
    render "show.html.erb"
  end
end
