class CreateLinks < ActiveRecord::Migration[6.0]
  def change
    create_table :links do |t|
      t.string :original_url, null: false, index: { unique: true }
      t.string :shortened_url, null: false, index: { unique: true }
      t.string :slug, null: false
      t.boolean :is_pinned, :default => false
      t.integer :clicked, :default => 0
      t.timestamps
    end
  end
end
