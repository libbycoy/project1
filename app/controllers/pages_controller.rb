class PagesController < ApplicationController
  def home
    @paintings = Painting.all
  end
end
