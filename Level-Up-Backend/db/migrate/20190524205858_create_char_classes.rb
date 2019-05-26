class CreateCharClasses < ActiveRecord::Migration[5.2]
  def change
    create_table :char_classes do |t|
      t.string :name
      t.integer :hit_die
      t.string :saving_throws
      t.text :info

      t.timestamps
    end
  end
end
