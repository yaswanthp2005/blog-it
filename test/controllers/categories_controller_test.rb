# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @headers = headers(@user)
  end

  def test_should_list_all_categories
    category = create(:category)
    get categories_path, headers: @headers, as: :json
    assert_response :success
    response_json = response.parsed_body

    expected_category_ids = Category.pluck(:id).sort
    actual_category_ids = response_json["categories"].pluck("id").sort

    assert_equal expected_category_ids, actual_category_ids
    assert_includes response_json["categories"].pluck("name"), category.name
  end

  def test_should_create_category_with_valid_name
    assert_difference "Category.count" do
      post categories_path,
        params: { category: { name: "Technology" } },
        headers: @headers,
        as: :json
    end

    assert_response :success
    response_json = response.parsed_body
    assert_equal I18n.t("successfully_created", entity: "Category"), response_json["notice"]
    assert_equal "Technology", response_json["category"]["name"]
  end

  def test_shouldnt_create_category_without_name
    post categories_path,
      params: { category: { name: "" } },
      headers: @headers,
      as: :json

    assert_response :unprocessable_entity
    assert_equal "Name can't be blank", response.parsed_body["error"]
  end

  def test_should_respond_with_unauthorized_for_invalid_auth_token
    get categories_path,
      headers: {
        Accept: "application/json",
        "X-Auth-Email" => @user.email,
        "X-Auth-Token" => "invalid-token"
      },
      as: :json

    assert_response :unauthorized
    assert_equal "Could not authenticate with the provided credentials", response.parsed_body["error"]
  end
end
