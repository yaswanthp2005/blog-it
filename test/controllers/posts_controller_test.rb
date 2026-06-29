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
    assert_not_empty response.parsed_body["posts"]
  end

  def test_should_list_only_published_posts_by_default
    draft_post = create(:post, status: :draft, user: @owner, organization: @owner.organization)

    get posts_url, headers: @owner_headers, as: :json
    assert_response :success

    post_slugs = response.parsed_body["posts"].pluck("slug")
    assert_includes post_slugs, @post.slug
    assert_not_includes post_slugs, draft_post.slug
  end

  def test_should_list_only_current_user_posts_when_mine_is_true
    other_post = create(:post, user: @other_user, organization: @owner.organization)
    draft_post = create(:post, status: :draft, user: @owner, organization: @owner.organization)

    get posts_url, params: { mine: "true" }, headers: @owner_headers, as: :json
    assert_response :success

    post_slugs = response.parsed_body["posts"].pluck("slug")
    assert_includes post_slugs, @post.slug
    assert_includes post_slugs, draft_post.slug
    assert_not_includes post_slugs, other_post.slug
  end

  def test_should_filter_posts_by_category_ids
    category = create(:category)
    categorized_post = create(:post, user: @owner, organization: @owner.organization)
    categorized_post.categories << category

    get posts_url,
      params: { category_ids: [category.id] },
      headers: @owner_headers,
      as: :json

    assert_response :success
    post_slugs = response.parsed_body["posts"].pluck("slug")
    assert_includes post_slugs, categorized_post.slug
    assert_not_includes post_slugs, @post.slug
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
    assert_equal "Post was successfully created!", response.parsed_body["notice"]
    assert_equal "new-blog-post", response.parsed_body["post"]["slug"]
  end

  def test_shouldnt_create_post_without_title
    post posts_url,
      params: {
        post: {
          title: "",
          description: "New blog post description."
        }
      },
      headers: @owner_headers,
      as: :json

    assert_response :unprocessable_entity
    assert_equal "Title can't be blank", response.parsed_body["error"]
  end

  def test_should_show_post
    get post_url(@post.slug), headers: @owner_headers, as: :json
    assert_response :success
    assert_equal @post.title, response.parsed_body["post"]["title"]
  end

  def test_owner_can_show_draft_post
    draft_post = create(:post, status: :draft, user: @owner, organization: @owner.organization)

    get post_url(draft_post.slug), headers: @owner_headers, as: :json
    assert_response :success
    assert_equal draft_post.title, response.parsed_body["post"]["title"]
  end

  def test_other_user_should_not_show_draft_post
    draft_post = create(:post, status: :draft, user: @owner, organization: @owner.organization)

    get post_url(draft_post.slug), headers: @other_user_headers, as: :json
    assert_response :forbidden
    assert_equal I18n.t("authorization.denied"), response.parsed_body["error"]
  end

  def test_owner_can_update_post
    put post_url(@post.slug),
      params: { post: { title: "Updated title" } },
      headers: @owner_headers,
      as: :json

    assert_response :success
    assert_equal "Updated title", @post.reload.title
    assert_equal "Post was successfully updated!", response.parsed_body["notice"]
  end

  def test_owner_can_update_post_without_notice_when_quiet_param_is_present
    put post_url(@post.slug),
      params: { post: { title: "Quiet update" }, quiet: true },
      headers: @owner_headers,
      as: :json

    assert_response :success
    assert_nil response.parsed_body["notice"]
    assert_equal "Quiet update", @post.reload.title
  end

  def test_other_user_should_not_update_post
    put post_url(@post.slug),
      params: { post: { title: "Updated title" } },
      headers: @other_user_headers,
      as: :json

    assert_response :forbidden
    assert_equal I18n.t("authorization.denied"), response.parsed_body["error"]
  end

  def test_other_user_should_not_destroy_post
    assert_no_difference "Post.count" do
      delete post_url(@post.slug), headers: @other_user_headers, as: :json
    end

    assert_response :forbidden
    assert_equal I18n.t("authorization.denied"), response.parsed_body["error"]
  end

  def test_owner_can_destroy_post
    assert_difference "Post.count", -1 do
      delete post_url(@post.slug), headers: @owner_headers, as: :json
    end

    assert_response :ok
    assert_equal "Post was successfully deleted!", response.parsed_body["notice"]
  end

  def test_owner_can_destroy_post_without_notice_when_quiet_param_is_present
    assert_difference "Post.count", -1 do
      delete post_url(@post.slug), params: { quiet: true }, headers: @owner_headers, as: :json
    end

    assert_response :success
    assert_nil response.parsed_body["notice"]
  end

  def test_not_found_error_rendered_for_invalid_post_slug
    get post_url("invalid-slug"), headers: @owner_headers, as: :json
    assert_response :not_found
    assert_equal "Couldn't find Post", response.parsed_body["error"]
  end
end
