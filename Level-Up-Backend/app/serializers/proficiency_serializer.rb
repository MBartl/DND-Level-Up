class ProficiencySerializer < ActiveModel::Serializer
  attributes :id, :category, :name

  has_many :characters
end
