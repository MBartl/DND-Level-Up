class SubclassSerializer < ActiveModel::Serializer
  attributes :id, :name, :flavor, :desc

  # belongs_to :char_class
end
