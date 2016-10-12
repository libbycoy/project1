class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :painting
  # validates :painting_id, uniqueness: {scope: user_id}
end
