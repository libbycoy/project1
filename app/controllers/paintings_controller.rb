class PaintingsController < ApplicationController
  def index
    @paintings = Painting.all
  end

  def new
    @painting = Painting.new
    # require 'base64'
    # data = params[:data_uri]
    # image_data = Base64.decode64(data['data:image/png;base64,'.length .. -1])
    
    # File.open("#{Rails.root}/public/uploads/somefilename.png", 'wb') do |f|
    #   f.write image_data
    # end
  end

  def create
    painting = @current_user.paintings.new painting_params

    if params[:upload].present?

      req = Cloudinary::Uploader.upload( params[:upload] )

      painting.image = req['public_id'] # "#{ params[:upload]}.png"

      if painting.save
        redirect_to painting
      else
        render :new
      end
    end

  end

  def edit
    @painting = Painting.find params[:id]
  end

  def show
    @painting = Painting.find params[:id]
  end

  def update
    painting = Painting.find params[:id]
    painting.update painting_params
    redirect_to painting
  end

  def destroy
    @painting = Painting.find params[:id]
    @painting.destroy
    redirect_to paintings_path
  end

  private
  def painting_params
    params.require(:painting).permit(:title, :style, :user_id)
  end
end
