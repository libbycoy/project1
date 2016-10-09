Rails.application.routes.draw do
  get 'pages/home'

  root :to => 'pages#home'
  resources :paintings
  resources :users, :only => [:new, :create, :show]

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  get '/users/:id' => 'users#show'

end
