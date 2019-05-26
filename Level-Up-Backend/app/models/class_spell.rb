class ClassSpell < ApplicationRecord
  belongs_to :char_class, optional: true
  belongs_to :subclass, optional: true
  belongs_to :spell
end
