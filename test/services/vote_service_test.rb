# frozen_string_literal: true

require "test_helper"

class VoteServiceTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @post = create(:post, user: @user, organization: @user.organization, upvotes: 0, downvotes: 0)
  end

  def test_should_create_upvote
    VoteService.new(post: @post, user: @user, vote_type: "upvote").process

    assert_equal 1, @post.upvotes
    assert_equal 0, @post.downvotes
    assert_equal "upvote", @post.user_vote_type(@user)
  end

  def test_should_remove_upvote_when_clicked_again
    VoteService.new(post: @post, user: @user, vote_type: "upvote").process
    VoteService.new(post: @post, user: @user, vote_type: "upvote").process

    assert_equal 0, @post.upvotes
    assert_nil @post.user_vote_type(@user)
  end

  def test_should_switch_from_upvote_to_downvote
    VoteService.new(post: @post, user: @user, vote_type: "upvote").process
    VoteService.new(post: @post, user: @user, vote_type: "downvote").process

    assert_equal 0, @post.upvotes
    assert_equal 1, @post.downvotes
    assert_equal "downvote", @post.user_vote_type(@user)
  end

  def test_should_restrict_user_to_one_vote
    other_user = create(:user, organization: @user.organization)

    VoteService.new(post: @post, user: @user, vote_type: "upvote").process
    VoteService.new(post: @post, user: other_user, vote_type: "downvote").process

    assert_equal 1, @post.upvotes
    assert_equal 1, @post.downvotes
    assert_equal 2, @post.votes.count
  end

  def test_should_set_is_bloggable_when_net_votes_exceed_threshold
    @post.update!(upvotes: Constants::BLOGGABLE_VOTE_THRESHOLD, downvotes: 0, is_bloggable: false)

    VoteService.new(post: @post, user: @user, vote_type: "upvote").process

    assert @post.is_bloggable
    assert_equal Constants::BLOGGABLE_VOTE_THRESHOLD + 1, @post.net_vote_count
  end

  def test_should_unset_is_bloggable_when_net_votes_fall_below_threshold
    @post.update!(
      upvotes: Constants::BLOGGABLE_VOTE_THRESHOLD + 1,
      downvotes: 0,
      is_bloggable: true
    )
    create(:vote, user: @user, post: @post, vote_type: :upvote)

    VoteService.new(post: @post, user: @user, vote_type: "upvote").process

    assert_not @post.is_bloggable
    assert_equal Constants::BLOGGABLE_VOTE_THRESHOLD, @post.net_vote_count
  end
end
