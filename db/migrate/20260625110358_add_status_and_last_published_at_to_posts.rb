# frozen_string_literal: true

class AddStatusAndLastPublishedAtToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :status, :string, default: "draft", null: false
    add_column :posts, :last_published_at, :datetime
  end
end
