class TasksController < ApplicationController
  before_action :require_login
  before_action :set_task, only: %i[edit update destroy]

  def index
    @tasks = current_user.tasks
  end

  def new
    @task = current_user.tasks.build
  end

  def create
    @task = current_user.tasks.build(task_params)
    if @task.save
      redirect_to tasks_path, notice: "Task created."
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @task.update(task_params)
      redirect_to tasks_path, notice: "Task updated."
    else
      render :edit
    end
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to tasks_path, notice: "Task deleted." }
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :description)
  end

  def set_task
    @task = current_user.tasks.find(params[:id])
  end
end
