module Api
    module V1
      class ResidentsController < Api::V1::BaseController
  
        # GET /v1/users
        def index
          render json: Resident.all
        end

        def create
          @resident = Resident.create!(resident_params)
          json_response(@resident, :created)
        end


  
        def show
          # Resident = Resident.find(params[:id])
          json_response(@resident)
        end

        def update
          @resident.update(resident_params)
          head :no_content
        end

        def destroy
          @resident.destroy
          head :no_content
        end
      end
    end
  end