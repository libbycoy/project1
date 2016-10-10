class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :fetch_user

  private
  def fetch_user
    if session[:user_id].present?
      @current_user = User.find_by :id => session[:user_id]
    end

    session[:user_id] = nil unless @current_user.present?
  end

  def check_for_user
    redirect_to root_path unless @current_user.present?
  end

  def check_for_admin
    redirect_to root_path unless (@current_user.present? && @current_user.admin?)
  end
end
