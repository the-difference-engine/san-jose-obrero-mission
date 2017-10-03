module Api
  module V1
    class UsersController < Api::V1::BaseController

      def index
        render json: User.all
      end

      def show
        user = User.find_by(id: params[:id])
        render json: user
      end

      def create

      end

      def update

      end

      def destroy

      end

    end
  end
end