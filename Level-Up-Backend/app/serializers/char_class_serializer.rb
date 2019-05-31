class CharClassSerializer < ActiveModel::Serializer
  attributes :id, :name, :proficiencies

  has_many :spells
  has_many :subclasses
  has_many :proficiencies
end
