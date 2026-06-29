# frozen_string_literal: true

require "test_helper"

class PostVotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @post = create(:post, user: @user, organization: @user.organization, upvotes: 0, downvotes: 0)
    @headers = headers(@user)
  end

  def test_should_create_upvote
    post post_vote_url(@post.slug),
      params: { vote: { vote_type: "upvote" } },
      headers: @headers,
      as: :json

    assert_response :success

    response_post = response.parsed_body["post"]
    assert_equal 1, response_post["upvotes"]
    assert_equal 0, response_post["downvotes"]
    assert_equal 1, response_post["net_vote_count"]
    assert_equal "upvote", response_post["user_vote"]
  end

  def test_should_toggle_downvote
    post post_vote_url(@post.slug),
      params: { vote: { vote_type: "downvote" } },
      headers: @headers,
      as: :json

    assert_response :success
    assert_equal 1, response.parsed_body["post"]["downvotes"]
    assert_equal "downvote", response.parsed_body["post"]["user_vote"]

    post post_vote_url(@post.slug),
      params: { vote: { vote_type: "downvote" } },
      headers: @headers,
      as: :json

    assert_response :success
    assert_equal 0, response.parsed_body["post"]["downvotes"]
    assert_nil response.parsed_body["post"]["user_vote"]
  end

  def test_should_not_allow_voting_on_draft_post
    draft_post = create(:post, status: :draft, user: @user, organization: @user.organization)

    post post_vote_url(draft_post.slug),
      params: { vote: { vote_type: "upvote" } },
      headers: @headers,
      as: :json

    assert_response :forbidden
  end
end
