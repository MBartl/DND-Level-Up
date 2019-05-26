class Subclass < ApplicationRecord
  belongs_to :char_class

  has_many :class_spells
  has_many :spells, through: :class_spells

  has_many :characters, dependent: :destroy
end
