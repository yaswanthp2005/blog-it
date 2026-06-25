# frozen_string_literal: true

class MakeSlugNotNullable < ActiveRecord::Migration[8.0]
  def change
    change_column_null :posts, :slug, false
  end
end
