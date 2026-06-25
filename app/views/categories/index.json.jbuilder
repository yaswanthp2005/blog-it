# frozen_string_literal: true

json.categories do
  json.array! @categories do |category|
    json.id category.id
    json.name category.name
  end
end
