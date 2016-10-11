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
    user = User.new user_params

    if params[:file].present?

      req = Cloudinary::Uploader.upload( params[:file] )

      user.image = req['public_id']
      user.save

      redirect_to user_path ( user )
    end
    # if @user.save
    #   redirect_to root_path # Sign up was successful
    # else
    #   render :new
    # end
  end

  def show
    @user = User.find params[:id]
    @paintings = Painting.all
  end

  def edit
    @user = @current_user
  end

  def update
    @user = @current_user
    if @user.update( user_params)
      flash[:message] = "Profile successfully updated"
      redirect_to user_path
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :image, :name, :password, :password_confirmation)
  end

end
