class TimeEntriesController < ApplicationController

  def new
    @time_entry = @task.time_entries.build
  end

  def edit
    @time_entry = @task.time_entries.find(params[:id])
  end

    @time_entry = @task.time_entries.new(time_entry_params)
    @time_entry.start_time ||= Time.current
    if @time_entry.save
      redirect_to calendar_path(date: @time_entry.start_time.to_date, task_id: @task.id)
    else
      render :new
    end
    if params[:time_entry] && params[:time_entry].key?(:start_time)
      if @time_entry.update(time_entry_params)
        redirect_to calendar_path(date: @time_entry.start_time.to_date, task_id: @task.id)
      else
        render :edit
      end
    else
      @time_entry.update(end_time: Time.current, comment: params[:time_entry][:comment])
      redirect_to calendar_path(date: Date.current, task_id: @task.id)
    end
  end

  def destroy
    @time_entry = @task.time_entries.find(params[:id])
    date = @time_entry.start_time.to_date
    @time_entry.destroy
    redirect_to calendar_path(date: date, task_id: @task.id)

  def time_entry_params
    params.fetch(:time_entry, {}).permit(:start_time, :end_time, :comment)
  end
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
