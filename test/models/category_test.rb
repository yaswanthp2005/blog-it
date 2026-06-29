# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_not_be_valid_without_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Name can't be blank"
  end

  def test_category_name_should_be_unique
    @category.save!
    duplicate_category = build(:category, name: @category.name)

    assert_not duplicate_category.valid?
    assert_includes duplicate_category.errors.full_messages, "Name has already been taken"
  end

  def test_valid_category_should_be_saved
    assert_difference "Category.count" do
      @category.save!
    end
  end
end
