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

ActiveRecord::Schema.define(version: 2021_05_20_191920) do

  create_table "links", force: :cascade do |t|
    t.string "original_url", null: false
    t.string "shortened_url", null: false
    t.string "slug", null: false
    t.boolean "is_pinned", default: false
    t.integer "clicked", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["original_url"], name: "index_links_on_original_url", unique: true
    t.index ["shortened_url"], name: "index_links_on_shortened_url", unique: true
  end

end
