class CharClassSerializer < ActiveModel::Serializer
  attributes :id, :spells

  has_many :characters, :spells, :subclasses, :proficiencies, :spells
end
