class Proficiency < ApplicationRecord
  has_many :class_proficiencies, dependent: :destroy
  has_many :character_proficiencies, dependent: :destroy

  has_many :characters, through: :character_proficiencies
  has_many :classes, through: :class_proficiencies
end
