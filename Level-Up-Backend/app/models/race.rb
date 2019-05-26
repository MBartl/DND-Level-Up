class Race < ApplicationRecord
  has_many :race_traits, dependent: :destroy
  has_many :traits, through: :race_traits

  has_many :characters, dependent: :destroy
end
