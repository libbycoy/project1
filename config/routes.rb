Rails.application.routes.draw do
  get 'pages/home'

  root :to => 'pages#home'
  resources :paintings
  resources :users, :only => [:new, :create, :show]

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
  get '/make' => 'users#make'
  get '/users' => 'users#index'

  get '/users/:id' => 'users#show'

end
