# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association :organization
    name { Faker::Name.name }
    email { Faker::Internet.email }
    password { "welcome" }
    password_confirmation { "welcome" }
  end
end
