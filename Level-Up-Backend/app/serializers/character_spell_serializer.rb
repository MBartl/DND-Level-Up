class CharacterSpellSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :spell
  belongs_to :character
end
