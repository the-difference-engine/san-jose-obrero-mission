module Api
    module V1
      class ResidentsController < Api::V1::BaseController
  
        # GET /v1/users
        def index
          render json: Resident.all

        def create
        end


  
        def show
          Resident = Resident.find(params[:id])
          render json: resident
        end

        def update
        end

        def destroy
        end
      end
    end
  end