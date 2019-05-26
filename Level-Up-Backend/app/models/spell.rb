class Spell < ApplicationRecord
  has_many :class_spells, dependent: :destroy
end
