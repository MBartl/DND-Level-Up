class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :bio, :race, :char_class, :subclass, :ability_score

  belongs_to :race
  belongs_to :ability_score
  belongs_to :campaign
  belongs_to :char_class
  belongs_to :subclass
end
