class CreateClassProficiencyChoices < ActiveRecord::Migration[5.2]
  def change
    create_table :class_proficiency_choices do |t|
      t.belongs_to :char_class, foreign_key: true
      t.belongs_to :proficiency, foreign_key: true
      t.string :proficiency_type
      t.integer :choices

      t.timestamps
    end
  end
end
