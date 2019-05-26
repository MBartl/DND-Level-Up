class Proficiency < ApplicationRecord
  has_many :class_proficiencies, dependent: :destroy
end
