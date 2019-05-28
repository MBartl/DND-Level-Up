class TraitSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :race
end
