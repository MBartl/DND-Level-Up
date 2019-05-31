class SubclassSerializer < ActiveModel::Serializer
  attributes :id, :name, :flavor, :desc
end
