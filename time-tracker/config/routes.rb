Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resource :session, only: %i[new create destroy]
  resources :users, only: %i[new create]

  resources :tasks, only: %i[index new create] do
    resources :time_entries, only: %i[create update]
  end

  get 'calendar(/:date)', to: 'calendar#show', as: :calendar

  root 'sessions#new'
end
