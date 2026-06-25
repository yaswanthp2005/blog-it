# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @post = Post.new(
      title: "Getting started with Rails",
      description: "Rails makes it easy to build web applications.",
      is_bloggable: true
    )
  end

  def test_should_set_slug_on_create
    @post.save!
    assert_equal "getting-started-with-rails", @post.slug
  end

  def test_should_generate_unique_slug_for_duplicate_titles
    @post.save!
    duplicate_post = Post.create!(
      title: "Getting started with Rails",
      description: "Another post with the same title.",
      is_bloggable: true
    )

    assert_equal "getting-started-with-rails-2", duplicate_post.slug
  end

  def test_should_not_allow_slug_to_be_updated
    @post.save!
    @post.slug = "updated-slug"

    assert_not @post.valid?
    assert_includes @post.errors[:slug], I18n.t("post.slug.immutable")
  end
end
