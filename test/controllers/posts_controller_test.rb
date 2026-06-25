# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @post = Post.create!(
      title: "Sample blog post",
      description: "Sample description for the blog post.",
      is_bloggable: true
    )
  end

  def test_should_get_index
    get posts_url, as: :json
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
        as: :json
    end

    assert_response :success
    assert_equal "Post was successfully created!", JSON.parse(response.body)["notice"]
  end

  def test_should_show_post
    get post_url(@post.slug), as: :json
    assert_response :success
    assert_equal @post.title, JSON.parse(response.body)["post"]["title"]
  end
end
