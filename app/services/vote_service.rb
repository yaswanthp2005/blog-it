# frozen_string_literal: true

class VoteService
  attr_reader :post, :user, :vote_type

  def initialize(post:, user:, vote_type:)
    @post = post
    @user = user
    @vote_type = vote_type
  end

  def process
    ActiveRecord::Base.transaction do
      existing_vote = post.votes.find_by(user:)

      if existing_vote.nil?
        create_vote
      elsif existing_vote.vote_type == vote_type
        remove_vote(existing_vote)
      else
        switch_vote(existing_vote)
      end

      post.save!
      post.reload
    end
  end

  private

    def create_vote
      post.votes.create!(user:, vote_type:)
      increment_counter(vote_type)
    end

    def remove_vote(existing_vote)
      decrement_counter(existing_vote.vote_type)
      existing_vote.destroy!
    end

    def switch_vote(existing_vote)
      decrement_counter(existing_vote.vote_type)
      increment_counter(vote_type)
      existing_vote.update!(vote_type:)
    end

    def increment_counter(type)
      if type == "upvote"
        post.upvotes += 1
      else
        post.downvotes += 1
      end
    end

    def decrement_counter(type)
      if type == "upvote"
        post.upvotes -= 1
      else
        post.downvotes -= 1
      end
    end
end
