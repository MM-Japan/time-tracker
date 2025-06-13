class TasksController < ApplicationController

  before_action :require_login

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

  private

  def task_params
    params.require(:task).permit(:name, :description)
  end
end
