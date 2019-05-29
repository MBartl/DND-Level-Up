class CharClassSerializer < ActiveModel::Serializer
  attributes :id, :spells

  has_many :characters
  has_many :spells
  has_many :subclasses
  has_many :proficiencies
  has_many :spells
end
