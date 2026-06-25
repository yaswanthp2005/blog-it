# frozen_string_literal: true

class AddUserAndOrganizationToPosts < ActiveRecord::Migration[8.0]
  def up
    organization = Organization.find_or_create_by!(name: "BigBinary")
    user = User.find_or_create_by!(email: "oliver@example.com") do |record|
      record.name = "Oliver Smith"
      record.password = "welcome"
      record.password_confirmation = "welcome"
      record.organization = organization
    end

    add_reference :posts, :user, foreign_key: true
    add_reference :posts, :organization, foreign_key: true

    Post.update_all(user_id: user.id, organization_id: organization.id)

    change_column_null :posts, :user_id, false
    change_column_null :posts, :organization_id, false
  end

  def down
    remove_reference :posts, :user, foreign_key: true
    remove_reference :posts, :organization, foreign_key: true
  end
end
