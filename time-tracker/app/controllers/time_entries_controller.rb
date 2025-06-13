class TimeEntriesController < ApplicationController
  before_action :set_task

  def create
    @time_entry = @task.time_entries.create(start_time: Time.current)
    redirect_to tasks_path
  end

  def update
    @time_entry = @task.time_entries.find(params[:id])
    @time_entry.update(end_time: Time.current)
    redirect_to tasks_path
  end

  private

  def set_task
    @task = Task.find(params[:task_id])
  end
end
