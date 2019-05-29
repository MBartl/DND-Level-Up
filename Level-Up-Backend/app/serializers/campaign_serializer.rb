class CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :plot_notes, :characters

  def characters
    self.object.characters.map do |character|
      {id: character.id,
      name: character.name,
      level: character.level,
      bio: character.bio,
      campaign: character.campaign,
      char_class: character.char_class,
      race: character.race,
      subclass: character.subclass}
    end
  end
end
