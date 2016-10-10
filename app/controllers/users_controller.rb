class UsersController < ApplicationController

# before_action :check_for_user, :only => [:index]
  before_action :check_for_admin, :only => [:index]

  def index
      @users = User.all
  end

  def new
    @user = User.new
  end

  def make
  end

  def create
    @user = User.new user_params

    if @user.save
      redirect_to root_path # Sign up was successful
    else
      render :new
    end
  end

  def show
    @user = User.find params[:id]
    @paintings = Painting.all
  end

  def edit
    @user = User.find params[:id]
  end

  def update
    user = User.find params[:id]
    user.update user_params
    redirect_to user_path
  end


  private
  def user_params
    params.require(:user).permit(:email, :image, :name, :password, :password_confirmation)
  end

end
