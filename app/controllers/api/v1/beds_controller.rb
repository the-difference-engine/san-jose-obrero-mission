module Api
  module V1
    class BedsController < Api::V1::BaseController

      before_action :set_bed, only: [:show, :update, :destroy]

      def index
        render json: Bed.all
      end

      def show 
        bed = Bed.find(params[:id])
        render json: bed
      end  

      def create
        bed = Bed.create!(bed_params)
        render json: bed
      end 

      def update
        @bed.update(bed_params)
        render json: @bed
      end 

      def destroy
        @bed.destroy
        render json: @bed
      end 

      private

      def bed_params
        #whitelist params
        params.permit(:name, :top_or_bottom, :occupied)
      end 

      def set_bed
        @bed = Bed.find(params[:id])
      end 
    
    end
  
  end
end