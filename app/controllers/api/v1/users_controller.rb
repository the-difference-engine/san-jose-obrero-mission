module Api
  module V1
    class UsersController < Api::V1::BaseController
      before_action :set_user, only: [:show, :update, :destroy]

      def index
        render json: User.all
      end

      def show
        render json: @user
      end

      def create
        user = User.create!(user_params)
        render json: user
      end

      def update
        @user.update(user_params)
        render json: @user
      end

      def destroy
        @user.destroy
        head :no_content
      end

      private

        def user_params
          params.permit(:id, :email, :role, :password)
        end

        def set_user
          @user = User.find_by(id: params[:id])
        end
    end
  end
end