class ClassProficiencyChoiceSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :proficiency
  belongs_to :char_class
end
