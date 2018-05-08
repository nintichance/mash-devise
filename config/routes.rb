Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api'
  get ':userid/contacts', :to => 'contacts#retrieve'
  post ':userid/contacts', :to => 'contacts#create'
  patch ':userid/contacts/:id', :to => 'contacts#update'
  delete ':userid/contacts/:id', :to => 'contacts#destroy'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :contacts
end
