class UsersController < ApplicationController

  before_action :check_for_user, :only => [:edit, :only]
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
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path # Sign up was successful
     else
       render :new
     end

  end

  def show
    @user = User.find params[:id]
    @paintings = Painting.all
    # @favorites = Favorite.all
  end

  def edit
    @user = @current_user
  end

  def update

    @user = @current_user
    @user.update_attributes( user_params )

    # raise 'hellz'

    if params[:file].present?
      req = Cloudinary::Uploader.upload( params[:file] )
      @user.image = req['public_id'] # "#{ params[:upload]}.png"
    end

    if @user.save
      flash[:message] = "Profile successfully updated"
      redirect_to user_path
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :name, :image, :password, :password_confirmation)
  end

end
