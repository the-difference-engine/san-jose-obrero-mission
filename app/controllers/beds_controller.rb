class BedsController < ApplicationController
  before_action :authenticate_user!
  

  def index
    this is a cool change that brakes stuff
    @beds = Bed.all
    render "index.html.erb"
  end

  def show
    @bed = Bed.find_by(id: params[:id])
    render "show.html.erb"
  end

  def edit
    @bed = Bed.find_by(id: params[:id])
  end

  def update
    @bed = Bed.update(
      name: params[:name],
      top_or_bottom: params[:top_or_bottom],
      occupied: params[:occupied]
      )
    redirect_to "/beds"
  end

end
