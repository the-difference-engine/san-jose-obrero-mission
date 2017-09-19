class UsersController < ApplicationController
  before_action :authenticate_admin!
  
  def new
    @role = ["admin", "case_manager", "residential aide", "security"]
    render 'new.html.erb'
  end

  def create
    user = User.new(
      email: params[:email],
      role: params[:role],
      password: params[:password],
      password_confirmation: params[:password_confirmation]
    )
    if user.save
      session[:user_id] = user.id
      flash[:success] = 'Successfully created account!'
      redirect_to '/'
    else
      flash[:warning] = 'Invalid email or password!'
      redirect_to '/signup'
    end
  end
end
