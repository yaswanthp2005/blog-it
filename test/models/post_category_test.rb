# frozen_string_literal: true

require "test_helper"

class PostCategoryTest < ActiveSupport::TestCase
  def setup
    @post = create(:post)
    @category = create(:category)
    @post_category = build(:post_category, post: @post, category: @category)
  end

  def test_post_category_should_not_be_valid_without_post
    @post_category.post = nil
    assert_not @post_category.valid?
    assert_includes @post_category.errors.full_messages, "Post must exist"
  end

  def test_post_category_should_not_be_valid_without_category
    @post_category.category = nil
    assert_not @post_category.valid?
    assert_includes @post_category.errors.full_messages, "Category must exist"
  end

  def test_post_category_should_not_allow_duplicate_category_for_same_post
    @post_category.save!
    duplicate_post_category = build(:post_category, post: @post, category: @category)

    assert_not duplicate_post_category.valid?
    assert_includes duplicate_post_category.errors.full_messages, "Category has already been taken"
  end

  def test_valid_post_category_should_be_saved
    assert_difference "PostCategory.count" do
      @post_category.save!
    end
  end
end
