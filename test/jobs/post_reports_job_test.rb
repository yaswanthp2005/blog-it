# frozen_string_literal: true

require "test_helper"
require "sidekiq/testing"

class PostReportsJobTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @post = create(:post, user: @user, organization: @user.organization, status: :published)
  end

  def test_should_generate_and_attach_pdf
    PostReportsJob.new.perform(@post.id, @user.id)

    @user.reload

    assert @user.report.attached?
    assert_equal "application/pdf", @user.report.content_type
    assert_equal "#{@post.slug}.pdf", @user.report.filename.to_s
  end
end
