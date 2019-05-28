class AbilityScore < ApplicationRecord
  has_many :characters, dependent: :destroy
end
