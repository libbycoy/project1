# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :text
#  name            :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  password_digest :string
#  image           :text
#  admin           :boolean
#

class User < ActiveRecord::Base
  has_secure_password
  validates :email, :presence => true, :uniqueness => true
  # validates :name, :uniqueness => true, :length => {minimum => 2}
  has_many :paintings
  has_many :favorites
  has_many :favorite_paintings, :through => :favorites, :source => :painting
  # has_many :paintings, :through => :favorites
end
