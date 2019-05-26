class CreateRaces < ActiveRecord::Migration[5.2]
  def change
    create_table :races do |t|
      t.string :name
      t.integer :speed
      t.string :ability_bonuses
      t.text :alignment
      t.text :age
      t.string :size

      t.timestamps
    end
  end
end
