# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_13_011253) do

  create_table "attacks", force: :cascade do |t|
    t.string "name"
    t.string "attack_type"
    t.string "attack_value"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "battle_stages", force: :cascade do |t|
    t.string "stage_name"
    t.string "stage_image"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "battles", force: :cascade do |t|
    t.integer "hero_id", null: false
    t.integer "enemy_id", null: false
    t.integer "battle_stage_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["battle_stage_id"], name: "index_battles_on_battle_stage_id"
    t.index ["enemy_id"], name: "index_battles_on_enemy_id"
    t.index ["hero_id"], name: "index_battles_on_hero_id"
  end

  create_table "enemies", force: :cascade do |t|
    t.string "name"
    t.string "bio"
    t.integer "enemy_hp"
    t.string "enemy_image"
    t.string "weakness"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "enemy_attacks", force: :cascade do |t|
    t.integer "enemy_id", null: false
    t.integer "attack_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attack_id"], name: "index_enemy_attacks_on_attack_id"
    t.index ["enemy_id"], name: "index_enemy_attacks_on_enemy_id"
  end

  create_table "games", force: :cascade do |t|
    t.string "player_name"
    t.integer "score"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hero_attacks", force: :cascade do |t|
    t.integer "hero_id", null: false
    t.integer "attack_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["attack_id"], name: "index_hero_attacks_on_attack_id"
    t.index ["hero_id"], name: "index_hero_attacks_on_hero_id"
  end

  create_table "heros", force: :cascade do |t|
    t.string "name"
    t.string "bio"
    t.integer "hero_hp"
    t.string "hero_image"
    t.string "weakness"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "battles", "battle_stages"
  add_foreign_key "battles", "enemies"
  add_foreign_key "battles", "heros"
  add_foreign_key "enemy_attacks", "attacks"
  add_foreign_key "enemy_attacks", "enemies"
  add_foreign_key "hero_attacks", "attacks"
  add_foreign_key "hero_attacks", "heros"
end
