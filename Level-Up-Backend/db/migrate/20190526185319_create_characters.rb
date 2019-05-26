class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.integer :level
      t.text :bio
      t.has_one :ability_score
      t.belongs_to :race, foreign_key: true
      t.belongs_to :char_class, foreign_key: true
      t.belongs_to :subclass, foreign_key: true
      t.belongs_to :campaign, foreign_key: true
      t.text :equipment

      t.timestamps
    end
  end
end
