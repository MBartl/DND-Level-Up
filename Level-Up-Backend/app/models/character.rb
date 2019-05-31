class Character < ApplicationRecord
  belongs_to :ability_score, optional: true
  has_many :character_campaigns, dependent: :destroy
  has_many :campaigns, through: :character_campaigns

  belongs_to :race
  belongs_to :char_class
  belongs_to :subclass

  has_many :skills, dependent: :destroy

  has_many :character_spells
  has_many :spells, through: :character_spells

  has_many :character_proficiency_choices, dependent: :destroy
  has_many :proficiencies, through: :character_proficiency_choices

  has_many :character_proficiencies, dependent: :destroy
  has_many :proficiencies, through: :character_proficiencies

  has_many :character_spells, dependent: :destroy
  has_many :spells, through: :character_spells

  def self.filter_campaign_characters(campaign)
    Character.all.select{|character| character.character_campaign.campaign == campaign }
  end
end
