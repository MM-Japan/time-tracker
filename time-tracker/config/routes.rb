Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :tasks, only: %i[index new create] do
    resources :time_entries, only: %i[create update]
  end

  root "tasks#index"
end
