class UsersController < ApplicationController

  def new
    @role = ["admin", "case_manager", "residential aide", "security"]
    render 'new.html.erb'
  end

  def create
    user = User.new(user_params)
    if user.save!
      session[:user_id] = user.id
      flash[:success] = 'Successfully created account!'
      redirect_to '/'
    else
      flash[:warning] = 'Invalid email or password!'
      redirect_to '/signup'
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :role, :password, :password_confirmation)
  end
end
