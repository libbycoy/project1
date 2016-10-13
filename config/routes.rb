Rails.application.routes.draw do
  get 'favorites/index'
  post '/favorites' => 'favorites#create'
  delete '/favorites' => 'favorites#destroy'

  get 'pages/home'

  root :to => 'pages#home'
  resources :paintings
  get '/users/edit' => 'users#edit', :as => 'edit_user'
  resources :users, :only => [:new, :create, :index, :update, :show]

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
  get '/make' => 'users#make'
  get '/users' => 'users#index'


  get '/users/:id' => 'users#show'

end
