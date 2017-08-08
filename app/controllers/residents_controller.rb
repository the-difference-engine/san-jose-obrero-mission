class ResidentsController < ApplicationController 

  def index 
    @residents = Resident.all 
    render "index.html.erb" 
  end 

  def new
  end 

  def create
  end 

  def show
  end 

  def edit
  end 

  def update
  end 

  def destroy
  end 

end
