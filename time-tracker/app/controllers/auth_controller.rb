class AuthController < ApplicationController
  def new
    @tab = params[:tab] || 'login'
    @user = User.new
  end

  def form
    @user = User.new
    if params[:tab] == 'signup'
      render partial: 'users/form', locals: { user: @user }
    else
      render partial: 'sessions/form'
    end
  end
end
