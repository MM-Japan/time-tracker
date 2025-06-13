class CalendarController < ApplicationController
  before_action :require_login

  def show
    @time_entries = current_user.time_entries.includes(:task).order(start_time: :desc)
    @time_entries = @time_entries.where(task_id: params[:task_id]) if params[:task_id]
  end
end
