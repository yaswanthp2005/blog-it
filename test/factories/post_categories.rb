# frozen_string_literal: true

FactoryBot.define do
  factory :post_category do
    association :post
    association :category
  end
end
