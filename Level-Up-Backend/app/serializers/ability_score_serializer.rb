class AbilityScoreSerializer < ActiveModel::Serializer
  attributes :id

  has_many :characters
end
