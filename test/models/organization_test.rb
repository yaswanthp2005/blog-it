# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization)
  end

  def test_organization_should_not_be_valid_without_name
    @organization.name = ""
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end

  def test_organization_name_should_be_unique
    @organization.save!
    duplicate_organization = build(:organization, name: @organization.name)

    assert_not duplicate_organization.valid?
    assert_includes duplicate_organization.errors.full_messages, "Name has already been taken"
  end

  def test_organization_should_not_be_deleted_when_users_exist
    @organization.save!
    create(:user, organization: @organization)

    assert_raises ActiveRecord::DeleteRestrictionError do
      @organization.destroy!
    end
  end

  def test_organization_should_not_be_deleted_when_posts_exist
    @organization.save!
    user = create(:user, organization: @organization)
    create(:post, user:, organization: @organization)

    assert_raises ActiveRecord::DeleteRestrictionError do
      @organization.destroy!
    end
  end
end
