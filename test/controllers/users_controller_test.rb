# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def test_should_signup_user_with_valid_credentials
    assert_difference "User.count" do
      post users_path,
        params: {
          user: {
            name: "Sam Smith",
            email: "sam@example.com",
            password: "welcome",
            password_confirmation: "welcome"
          }
        },
        as: :json
    end

    assert_response :success
    response_json = response.parsed_body
    assert_equal "Successfully created User", response_json["notice"]
    assert_equal "sam@example.com", response_json["user"]["email"]
    assert_equal "Personal Blog", Organization.last.name
  end

  def test_shouldnt_signup_user_with_invalid_credentials
    post users_path,
      params: {
        user: {
          name: "Sam Smith",
          email: "sam@example.com",
          password: "welcome",
          password_confirmation: "not matching confirmation"
        }
      },
      as: :json

    assert_response :unprocessable_entity
    assert_equal "Password confirmation doesn't match Password", response.parsed_body["error"]
  end

  def test_should_reuse_existing_personal_blog_organization
    existing_organization = Organization.create!(name: "Personal Blog")

    post users_path,
      params: {
        user: {
          name: "Sam Smith",
          email: "sam@example.com",
          password: "welcome",
          password_confirmation: "welcome"
        }
      },
      as: :json

    assert_response :success
    assert_equal existing_organization.id, User.last.organization_id
    assert_equal 1, Organization.where(name: "Personal Blog").count
  end
end
