Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api'
  get ':userid/contacts', :to => 'contacts#retrieve'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :contacts
end
