class TimeEntriesController < ApplicationController
  before_action :require_login
  before_action :set_task

  def create
    @time_entry = @task.time_entries.create(start_time: Time.current)
    redirect_to calendar_path
  end

  def update
    @time_entry = @task.time_entries.find(params[:id])
    @time_entry.update(end_time: Time.current, comment: params[:time_entry][:comment])
    redirect_to calendar_path
  end

  private

  def set_task
    @task = current_user.tasks.find(params[:task_id])
  end
end
