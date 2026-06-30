# frozen_string_literal: true

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  constraints(lambda { |req| req.format == :json }) do
    resource :session, only: %i[create destroy]
    resources :users, only: :create
    resources :categories, only: %i[index create]
    resources :posts, except: %i[new edit], param: :slug do
      resource :vote, only: :create, controller: "post_votes"
      resource :report, only: :create, module: :posts do
        get :download, on: :collection
      end
    end
    resource :bulk_update, only: %i[update destroy], module: :posts
  end

  root "home#index"
  get "*path",
    to: "home#index",
    via: :all
end
