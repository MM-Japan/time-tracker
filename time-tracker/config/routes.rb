Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resource :session, only: %i[create destroy]
  resources :users, only: %i[create edit update]

  get 'session/new', to: 'auth#new', defaults: { tab: 'login' }, as: :new_session
  get 'users/new', to: 'auth#new', defaults: { tab: 'signup' }, as: :new_user
  get 'auth/form', to: 'auth#form', as: :auth_form

  resources :tasks do
    resources :time_entries, except: %i[show]
  end

  resources :time_entries, only: %i[destroy]

  get 'calendar(/:date)', to: 'calendar#show', as: :calendar

  root 'tasks#index'
end
