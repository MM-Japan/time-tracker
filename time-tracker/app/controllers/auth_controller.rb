class AuthController < ApplicationController
  def new
    @tab = params[:tab] || 'login'
    @user = User.new
  end

  def form
    @tab = params[:tab] || 'login'
    @user = User.new
    render partial: 'auth/form', locals: { tab: @tab, user: @user }
  end
end
