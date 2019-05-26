class Trait < ApplicationRecord
  has_many :race_traits, dependent: :destroy
end
