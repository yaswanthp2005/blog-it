# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @owner = create(:user)
    @other_user = create(:user, organization: @owner.organization)
    @post = create(:post, user: @owner, organization: @owner.organization)
    @owner_headers = headers(@owner)
    @other_user_headers = headers(@other_user)
  end

  def test_should_get_index
    get posts_url, headers: @owner_headers, as: :json
    assert_response :success
    assert_not_empty JSON.parse(response.body)["posts"]
  end

  def test_should_create_post
    assert_difference("Post.count") do
      post posts_url,
        params: {
          post: {
            title: "New blog post",
            description: "New blog post description."
          }
        },
        headers: @owner_headers,
        as: :json
    end

    assert_response :success
    assert_equal "Post was successfully created!", JSON.parse(response.body)["notice"]
  end

  def test_should_show_post
    get post_url(@post.slug), headers: @owner_headers, as: :json
    assert_response :success
    assert_equal @post.title, JSON.parse(response.body)["post"]["title"]
  end

  def test_other_user_should_not_update_post
    put post_url(@post.slug),
      params: { post: { title: "Updated title" } },
      headers: @other_user_headers,
      as: :json

    assert_response :forbidden
    assert_equal I18n.t("authorization.denied"), JSON.parse(response.body)["error"]
  end

  def test_other_user_should_not_destroy_post
    assert_no_difference "Post.count" do
      delete post_url(@post.slug), headers: @other_user_headers, as: :json
    end

    assert_response :forbidden
    assert_equal I18n.t("authorization.denied"), JSON.parse(response.body)["error"]
  end

  def test_owner_can_destroy_post
    assert_difference "Post.count", -1 do
      delete post_url(@post.slug), headers: @owner_headers, as: :json
    end

    assert_response :ok
  end
end
