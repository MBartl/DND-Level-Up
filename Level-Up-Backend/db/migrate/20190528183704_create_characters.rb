class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.integer :level
      t.text :bio
      t.belongs_to :ability_score, foreign_key: true
      t.belongs_to :race, foreign_key: true
      t.belongs_to :char_class, foreign_key: true
      t.belongs_to :subclass, foreign_key: true
      t.belongs_to :campaign, foreign_key: true
      t.text :equipment

      t.timestamps
    end
  end
end
