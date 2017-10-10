class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception 

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def authenticate_user!
    redirect_to '/login' unless current_user
  end

  def authenticate_admin!
    redirect_to 'login' unless current_user.role == 'admin' 
  end

  def authenticate_case_manager!
    redirect_to '/login' unless current_user.role == 'case_manager' || current_user.role == 'admin'
  end
 
  def authenticate_residential_aide!
    redirect_to 'login' unless current_user.role == 'residential_aide' || current_user.role == 'admin' || current_user.role == 'case_manager'
  end
  
end
