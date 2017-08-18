class ResidentsController < ApplicationController 

  def index 
    @residents = Resident.all 
    render "index.html.erb" 
  end 

  def new
    @beds = Bed.all
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
                ethnicity: params[:ethnicity],
                bed_id: params[:bed_id],
                image: params[:image]
              )
    bed = Bed.find_by(id: params[:bed_id])
    bed.update(
      occupied: !bed.occupied
    )
    redirect_to '/residents'
  end 

def show
  @resident = Resident.find_by(id: params[:id])
  render "show.html.erb"
end 

def edit
  @resident = Resident.find_by(id: params[:id])
  render "edit.html.erb"
end 

  def update
     resident = Resident.find_by(id: params[:id])
     resident.update(
                first_name: params[:first_name].capitalize,
                last_name: params[:last_name].capitalize,
                documented: params[:documented],
                gender: params[:gender],
                image: params[:image]
              )

    redirect_to '/residents'
  end 

def destroy
  resident = Resident.find_by(id: params[:id])
  resident.destroy
  
  redirect_to '/residents'
end 

end
