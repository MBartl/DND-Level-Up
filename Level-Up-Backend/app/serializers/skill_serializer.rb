class SkillSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :character
end
