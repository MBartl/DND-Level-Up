class CharacterProficiency < ApplicationRecord
  belongs_to :proficiency
  belongs_to :character
end
