class CreateCampaigns < ActiveRecord::Migration[5.2]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.text :plot_notes

      t.timestamps
    end
  end
end
