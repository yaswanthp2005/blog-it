# frozen_string_literal: true

class AddSlugToPost < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :slug, :string
  end
end
