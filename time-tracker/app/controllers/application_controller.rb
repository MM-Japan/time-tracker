class ApplicationController < ActionController::Base

  helper_method :current_user, :current_running_entry


  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end


  def current_running_entry
    current_user&.running_time_entry
  end

  def require_login
    redirect_to new_session_path unless current_user
  end
end
