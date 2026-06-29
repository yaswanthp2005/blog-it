# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    association :user
    organization { user.organization }
    title { Faker::Lorem.sentence[0..49] }
    description { Faker::Lorem.paragraph }
    is_bloggable { true }
    status { :published }
  end
end
