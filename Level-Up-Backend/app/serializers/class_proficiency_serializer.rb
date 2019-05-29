class ClassProficiencySerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :char_class
  belongs_to :proficiency
end
