class CharacterProficiencyChoiceSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :proficiency
  belongs_to :character
end
