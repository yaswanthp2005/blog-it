# frozen_string_literal: true

json.id post.id
json.slug post.slug
json.title post.title
json.description post.description
json.author_name post.user.name
json.user_id post.user_id
json.status post.status
json.categories post.categories do |category|
  json.id category.id
  json.name category.name
end
json.created_at post.created_at
json.updated_at post.updated_at
json.last_published_at post.last_published_at
json.upvotes post.upvotes
json.downvotes post.downvotes
json.net_vote_count post.net_vote_count
json.is_bloggable post.is_bloggable
json.user_vote post.user_vote_type(current_user)
