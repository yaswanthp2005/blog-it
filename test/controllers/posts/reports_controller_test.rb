# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class Posts::ReportsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @post = create(:post, user: @user, organization: @user.organization, status: :published)
    @headers = headers(@user)
  end

  def test_should_enqueue_pdf_generation
    Sidekiq::Testing.fake! do
      assert_difference -> { PostReportsJob.jobs.size }, 1 do
        post post_report_url(@post.slug), headers: @headers, as: :json
      end
    end

    assert_response :success
  end

  def test_should_download_pdf
    post post_report_url(@post.slug), headers: @headers, as: :json

    get download_post_report_url(@post.slug), headers: @headers

    assert_response :success
    assert_equal "application/pdf", response.content_type
    assert_match(/attachment/, response.headers["Content-Disposition"])
  end

  def test_should_not_download_pdf_when_not_generated
    get download_post_report_url(@post.slug), headers: @headers

    assert_response :not_found
  end

  def test_should_not_generate_pdf_for_unauthorized_post
    teammate = create(:user, organization: @user.organization)
    draft_post = create(
      :post,
      status: :draft,
      user: teammate,
      organization: @user.organization
    )

    post post_report_url(draft_post.slug), headers: @headers, as: :json

    assert_response :forbidden
  end
end
