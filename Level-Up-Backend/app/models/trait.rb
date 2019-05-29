class Trait < ApplicationRecord
  has_many :race_traits, dependent: :destroy
  has_many :races, through: :race_traits
end
