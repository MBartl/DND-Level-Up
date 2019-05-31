class CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :plot_notes, :characters

  has_many :characters

  def characters
    self.object.characters.map do |character|
      {
        id: character.id,
        name: character.name,
        level: character.level,
        bio: character.bio,
        character_campaign: character.character_campaigns,
        char_class: character.char_class,
        race: character.race,
        subclass: character.subclass
      }
    end
  end
end
