class Skill < ApplicationRecord
  belongs_to :character, optional: true
end
