class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :bio

  belongs_to :race
  belongs_to :ability_score
  belongs_to :campaign


  has_many :proficiencies
  has_many :spells
end
