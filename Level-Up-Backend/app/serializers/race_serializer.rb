class RaceSerializer < ActiveModel::Serializer
  attributes :id, :name, :speed, :ability_bonuses, :alignment, :age, :size

  has_many :traits
end
