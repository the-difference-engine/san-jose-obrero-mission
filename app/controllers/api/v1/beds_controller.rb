module Api
  module V1
    class BedsController < Api::V1::BaseController

      def index
        render json: Bed.all
      end

      def show 
        bed = Bed.find(params[:id])
        render json: bed
      end 
    
    end
  
  end
end