# frozen_string_literal: true

require "test_helper"

class Posts::BulkUpdatesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @owner = create(:user)
    @other_user = create(:user, organization: @owner.organization)
    @first_post = create(:post, user: @owner, organization: @owner.organization)
    @second_post = create(
      :post,
      status: :draft,
      user: @owner,
      organization: @owner.organization
    )
    @other_user_post = create(:post, user: @other_user, organization: @owner.organization)
    @owner_headers = headers(@owner)
    @other_user_headers = headers(@other_user)
  end

  def test_should_bulk_update_status
    patch bulk_update_url,
      params: {
        bulk_update: {
          slugs: [@first_post.slug, @second_post.slug],
          status: "draft"
        }
      },
      headers: @owner_headers,
      as: :json

    assert_response :success
    assert_equal I18n.t("bulk_update.status_updated", count: 2), response.parsed_body["notice"]
    assert @first_post.reload.draft?
    assert @second_post.reload.draft?
  end

  def test_should_bulk_delete_posts
    delete bulk_update_url,
      params: {
        bulk_update: {
          slugs: [@first_post.slug, @second_post.slug]
        }
      },
      headers: @owner_headers,
      as: :json

    assert_response :success
    assert_equal I18n.t("bulk_update.deleted", count: 2), response.parsed_body["notice"]
    assert_raises(ActiveRecord::RecordNotFound) { @first_post.reload }
    assert_raises(ActiveRecord::RecordNotFound) { @second_post.reload }
  end

  def test_should_not_bulk_update_other_users_posts
    patch bulk_update_url,
      params: {
        bulk_update: {
          slugs: [@other_user_post.slug],
          status: "draft"
        }
      },
      headers: @owner_headers,
      as: :json

    assert_response :forbidden
  end

  def test_should_not_bulk_delete_other_users_posts
    delete bulk_update_url,
      params: {
        bulk_update: {
          slugs: [@other_user_post.slug]
        }
      },
      headers: @owner_headers,
      as: :json

    assert_response :forbidden
  end
end
