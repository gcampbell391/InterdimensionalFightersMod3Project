class CreateBattleStages < ActiveRecord::Migration[6.0]
  def change
    create_table :battle_stages do |t|
      t.string :stage_name
      t.string :stage_image

      t.timestamps
    end
  end
end
