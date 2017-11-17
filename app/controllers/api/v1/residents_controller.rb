module Api
    module V1
      class ResidentsController < Api::V1::BaseController
  
        # GET /v1/users
        def index

          render json: { residents: Resident.all, table_headers: table_headers }
          
        end

        def create

          resident = Resident.new(resident_params)
          if resident.save!
            render json: resident
          end
        end


  
        def show
          # Resident = Resident.find(params[:id])
          render json: @resident
        end

        def update
          @resident.update(resident_params)
          render json: @resident
        end

        def destroy
          @resident.destroy
          head :no_content
        end

        private

          def resident_params
            params.require(:resident).permit(
              :first_name,
              :last_name,
              :date,
              :hmis_number,
              :hmis_entry_date,
              :documented,
              :gender,
              :ethnicity,
              :bed_id,
              :resident_race,
              :cause_of_homelessness,
              :length_of_homelessness,
              :prior_living_situation,
              :number_of_shelters,
              :chronically_homeless,
              :image
            )

          end

          def table_headers
            ["Full Name", "Gender", "Admitted", "Released", "Tenure", "Status", "Bed Number"]
          end
      end
    end
end