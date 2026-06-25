# frozen_string_literal: true

json.id post.id
json.slug post.slug
json.title post.title
json.description post.description
json.author_name post.user.name
json.categories post.categories do |category|
  json.id category.id
  json.name category.name
end
json.created_at post.created_at
