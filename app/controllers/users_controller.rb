class UsersController < ApplicationController
  before_action :authenticate_admin!

  def index 
    @users = User.all 
    render "index.html.erb" 
  end 
  
  def new
    @role = ["admin", "case_manager", "residential_aide", "security"]
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
      redirect_to '/residents'
    else
      flash[:warning] = 'Invalid email or password!'
      redirect_to '/signup'
    end
  end
end
