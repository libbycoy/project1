class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all
  end

  def create
    @painting = Painting.find params[:painting_id]
    @painting.favorites.create :user => @current_user
    redirect_to favorites_index_path
  end

  def destroy
    @painting = Painting.find params[:painting_id]
    @painting.favorites.where(:user_id => @current_user.id).destroy_all
    redirect_to favorites_index_path
  end

  # def favorite
  #   painting = Painting.find(params[:id])
  #   @current_user.paintings << painting
  # end

end
