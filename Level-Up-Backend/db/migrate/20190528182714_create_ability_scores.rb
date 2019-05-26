class CreateAbilityScores < ActiveRecord::Migration[5.2]
  def change
    create_table :ability_scores do |t|
      t.integer :strength
      t.integer :dexterity
      t.integer :constitution
      t.integer :intelligence
      t.integer :wisdom
      t.integer :charisma

      t.timestamps
    end
  end
end
