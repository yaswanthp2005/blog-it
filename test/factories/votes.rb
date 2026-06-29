# frozen_string_literal: true

FactoryBot.define do
  factory :vote do
    association :user
    association :post
    vote_type { :upvote }
  end
end
