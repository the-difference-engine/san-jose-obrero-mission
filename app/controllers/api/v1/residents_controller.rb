module Api
    module V1
      class ResidentsController < Api::V1::BaseController
  
        # GET /v1/users
        def index

          render json: { residents: Resident.all, table_headers: table_headers }
          
        end

        def create
          resident = Resident.create!(resident_params)
          render json: resident
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

        def table_headers
          ["Full Name", "Gender", "Admitted", "Released", "Tenure", "Status", "Bed Number"]
        end
      end
    end
end