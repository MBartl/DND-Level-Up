class CharClass < ApplicationRecord
  has_many :class_proficiencies, dependent: :destroy
  has_many :proficiencies, through: :class_proficiencies

  has_many :subclasses, dependent: :destroy

  has_many :class_spells
  has_many :spells, through: :class_spells

  has_many :characters, dependent: :destroy

  has_many :class_proficiency_choices, dependent: :destroy
  has_many :proficiencies, through: :character_proficiency_choices
end
