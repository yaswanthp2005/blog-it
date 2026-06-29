# frozen_string_literal: true

redis_url = ENV.fetch("REDIS_URL", "redis://localhost:6379/0")

if Rails.env.test?
  require "sidekiq/testing"
  Sidekiq::Testing.inline!
end

Sidekiq.configure_server do |config|
  config.redis = { url: redis_url, size: 9 }
end

Sidekiq.configure_client do |config|
  config.redis = { url: redis_url, size: 1 }
end
