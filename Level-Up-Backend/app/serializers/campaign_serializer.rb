class Api::V1::CampaignSerializer < ActiveModel::Serializer
  attributes :id, :name, :plot_notes
end
