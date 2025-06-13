class CalendarController < ApplicationController
  before_action :require_login

  def show
    @date = params[:date] ? Date.parse(params[:date]) : Date.current
    @tasks = Task.all.includes(:time_entries)
  end
end
