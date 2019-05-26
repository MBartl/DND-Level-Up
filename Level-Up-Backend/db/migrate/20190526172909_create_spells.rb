class CreateSpells < ActiveRecord::Migration[5.2]
  def change
    create_table :spells do |t|
      t.string :name
      t.text :desc
      t.string :range
      t.string :components
      t.string :duration
      t.boolean :concentration
      t.string :casting_time
      t.integer :level
      t.string :school

      t.timestamps
    end
  end
end
