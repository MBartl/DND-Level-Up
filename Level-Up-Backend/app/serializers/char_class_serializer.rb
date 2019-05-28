class CharClassSerializer < ActiveModel::Serializer
  attributes :id

  has_many :characters, :spells, :subclasses
end
