class CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :plot_notes

  has_many :characters
end
