# frozen_string_literal: true

class Vote < ApplicationRecord
  enum :vote_type, { upvote: "upvote", downvote: "downvote" }

  belongs_to :user
  belongs_to :post

  validates :vote_type, presence: true
  validates :user_id, uniqueness: { scope: :post_id }
end
