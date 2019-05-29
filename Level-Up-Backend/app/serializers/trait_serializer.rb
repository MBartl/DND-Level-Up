class TraitSerializer < ActiveModel::Serializer
  attributes :id

  has_many :race_traits
  has_many :races, through: :race_traits
end
