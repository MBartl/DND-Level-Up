class Campaign < ApplicationRecord
  has_many :character_campaigns, dependent: :destroy
  has_many :characters, through: :character_campaigns
end
