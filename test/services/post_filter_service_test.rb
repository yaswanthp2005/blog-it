# frozen_string_literal: true

require "test_helper"

class PostFilterServiceTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category)
    @post = create(:post, user: @user, organization: @user.organization, title: "Rails tutorial")
    @other_post = create(
      :post,
      user: @user,
      organization: @user.organization,
      title: "React guide",
      status: :draft
    )
    @posts = Post.where(user_id: @user.id)
  end

  def test_filters_by_title
    filtered_posts = PostFilterService.new(@posts, params: { title: "rails" }).process

    assert_includes filtered_posts, @post
    assert_not_includes filtered_posts, @other_post
  end

  def test_filters_by_category
    @post.categories << @category

    filtered_posts = PostFilterService.new(
      @posts,
      params: { category_ids: [@category.id] }
    ).process

    assert_includes filtered_posts, @post
    assert_not_includes filtered_posts, @other_post
  end

  def test_filters_by_status
    filtered_posts = PostFilterService.new(
      @posts,
      params: { status: "draft" }
    ).process

    assert_includes filtered_posts, @other_post
    assert_not_includes filtered_posts, @post
  end

  def test_returns_all_posts_when_no_filters_are_present
    filtered_posts = PostFilterService.new(@posts, params: {}).process

    assert_equal @posts.order(:id).pluck(:id), filtered_posts.order(:id).pluck(:id)
  end
end
