# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170901014334) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "beds", force: :cascade do |t|
    t.integer  "room_id"
    t.string   "name"
    t.string   "top_or_bottom"
    t.boolean  "occupied"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "resident_id"
  end

  create_table "residents", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "date"
    t.string   "hmis_number"
    t.datetime "hmis_entry_date"
    t.boolean  "documented"
    t.string   "gender"
    t.string   "ethnicity"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "bed_id"
    t.string   "resident_race"
    t.string   "cause_of_homeslessness"
    t.string   "length_of_homelessness"
    t.string   "prior_living_situation"
    t.integer  "number_of_shelters"
    t.boolean  "chronically_homeless"
    t.string   "image"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.integer  "role"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
