class TimeEntriesController < ApplicationController

  before_action :require_login
  before_action :set_task

  def new
    @time_entry = @task.time_entries.build
  end

  def edit
    @time_entry = @task.time_entries.find(params[:id])
  end

  def create
    return head :unprocessable_entity if current_user.running_time_entry

    @time_entry = @task.time_entries.new(time_entry_params)
    @time_entry.start_time ||= Time.current
    if @time_entry.save
      respond_to do |format|
        format.html { redirect_to calendar_path(date: @time_entry.start_time.to_date, task_id: @task.id) }
        format.json { render json: { id: @time_entry.id, start_time: @time_entry.start_time.iso8601 } }
      end
    else
      render :new
    end

  end

  def update
    @time_entry = @task.time_entries.find(params[:id])

    if params[:time_entry] && params[:time_entry].key?(:start_time)
      if @time_entry.update(time_entry_params)
        redirect_to calendar_path(date: @time_entry.start_time.to_date, task_id: @task.id)
      else
        render :edit
      end
    else
      @time_entry.update(end_time: Time.current, comment: params[:time_entry][:comment])
      respond_to do |format|
        format.html { redirect_to calendar_path(date: Date.current, task_id: @task.id) }
        format.json { head :no_content }
      end
    end
  end

  def destroy
    @time_entry = @task.time_entries.find(params[:id])
    date = @time_entry.start_time.to_date
    @time_entry.destroy
    redirect_to calendar_path(date: date, task_id: @task.id)

  end

  private

  def set_task

    @task = current_user.tasks.find(params[:task_id])
  end

  def time_entry_params
    params.fetch(:time_entry, {}).permit(:start_time, :end_time, :comment)

  end
end
