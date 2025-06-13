class CalendarController < ApplicationController
  before_action :require_login

  def show
    @date = params[:date] ? Date.parse(params[:date]) : Date.current
    @tasks = current_user.tasks.includes(:time_entries)
  end
end
