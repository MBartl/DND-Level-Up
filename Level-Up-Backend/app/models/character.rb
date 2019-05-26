class Character < ApplicationRecord
  has_one :ability_score, dependent: :destroy
  belongs_to :race
  belongs_to :char_class
  belongs_to :subclass
  belongs_to :campaign, optional: true

  has_many :race_traits, through: :race

  has_many :character_proficiencies, dependent: :destroy
  has_many :proficiencies, through: :character_proficiencies

  has_many :character_spells, dependent: :destroy
  has_many :spells, through: :character_spells
end
