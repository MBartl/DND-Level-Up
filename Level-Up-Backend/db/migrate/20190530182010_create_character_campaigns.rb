class CreateCharacterCampaigns < ActiveRecord::Migration[5.2]
  def change
    create_table :character_campaigns do |t|
      t.belongs_to :character, foreign_key: true
      t.belongs_to :campaign, foreign_key: true

      t.timestamps
    end
  end
end
