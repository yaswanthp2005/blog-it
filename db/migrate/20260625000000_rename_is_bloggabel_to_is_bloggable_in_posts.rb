# frozen_string_literal: true

class RenameIsBloggabelToIsBloggableInPosts < ActiveRecord::Migration[8.0]
  def change
    rename_column :posts, :is_bloggabel, :is_bloggable
  end
end
