class ResidentsController < ApplicationController 

  def index 
    @residents = Resident.all 
    render "index.html.erb" 
  end 

  def new
    render "new.html.erb"
  end 

  def create
    resident = Resident.create(
                first_name: params[:first_name].capitalize,
                last_name: params[:last_name].capitalize,
                date: params[:date],
                hmis_number: params[:hmis_number],
                hmis_entry_date: params[:hmis_entry_date],
                documented: params[:documented],
                gender: params[:gender],
                ethnicity: params[:ethnicity]
              )

    redirect_to '/residents'
  end 

#   def show
#   end 

#   def edit
#   end 

#   def update
#   end 

#   def destroy
#   end 

end
