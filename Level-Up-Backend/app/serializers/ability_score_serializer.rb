class AbilityScoreSerializer < ActiveModel::Serializer
  attributes :id, :strength, :dexterity, :constitution, :wisdom, :intelligence, :charisma
end
