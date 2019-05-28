class SpellSerializer < ActiveModel::Serializer
  attributes :id, :name, :desc, :range, :components, :concentration, :duration, :casting_time, :level, :school
end
