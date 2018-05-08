class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  protected

  def configure_permitted_parameters
     devise_parameter_sanitizer.for(:sign_up).push(:name, :surname,:username, :email, :avatar)
     devise_parameter_sanitizer.for(:account_update).push(:name, :surname, :email, :avatar)
  end
end
