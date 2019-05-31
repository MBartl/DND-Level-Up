class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :level, :bio, :skills, :ability_score

  belongs_to :race
  belongs_to :char_class
  belongs_to :subclass
  belongs_to :character_campaigns

  def char_class
    self.object.char_class.name
  end
end
