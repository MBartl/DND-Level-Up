class CharClassSerializer < ActiveModel::Serializer
  attributes :id, :name, :spells

  # has_many :characters
  has_many :spells
  has_many :subclasses
  has_many :proficiencies
end
