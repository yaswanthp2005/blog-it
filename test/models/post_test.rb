# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @post = build(
      :post,
      user: @user,
      organization: @user.organization,
      title: "Getting started with Rails",
      description: "Rails makes it easy to build web applications."
    )
  end

  def test_values_of_created_at_and_updated_at
    post = Post.new(
      title: "This is a test post",
      description: "This is a test description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    assert_nil post.created_at
    assert_nil post.updated_at

    post.save!
    assert_not_nil post.created_at
    assert_equal post.updated_at, post.created_at

    post.update!(title: "This is an updated post")
    assert_not_equal post.updated_at, post.created_at
  end

  def test_post_should_not_be_valid_without_user
    @post.user = nil
    assert_not @post.save
    assert_includes @post.errors.full_messages, "User must exist"
  end

  def test_post_should_not_be_valid_without_organization
    @post.organization = nil
    assert_not @post.save
    assert_includes @post.errors.full_messages, "Organization must exist"
  end

  def test_post_title_should_not_exceed_maximum_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_post_description_should_not_exceed_maximum_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_post_should_not_be_valid_without_title
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Title can't be blank"
  end

  def test_post_should_not_be_valid_without_description
    @post.description = ""
    assert_not @post.valid?
    assert_includes @post.errors.full_messages, "Description can't be blank"
  end

  def test_post_should_default_to_draft_status
    post = Post.create!(
      title: "Draft post",
      description: "Draft description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    assert post.draft?
  end

  def test_post_sets_last_published_at_when_published
    @post.status = :draft
    @post.save!

    assert_nil @post.last_published_at

    @post.update!(status: :published)
    assert_not_nil @post.last_published_at
  end

  def test_post_does_not_update_last_published_at_when_already_published
    @post.update!(status: :published)
    original_last_published_at = @post.last_published_at

    travel 1.hour do
      @post.update!(status: :published)
    end

    assert_equal original_last_published_at, @post.reload.last_published_at
  end

  def test_post_sets_is_bloggable_when_net_vote_count_exceeds_threshold
    @post.update!(upvotes: Constants::BLOGGABLE_VOTE_THRESHOLD + 1, downvotes: 0)

    assert @post.is_bloggable
  end

  def test_post_unsets_is_bloggable_when_net_vote_count_does_not_exceed_threshold
    @post.update!(
      upvotes: Constants::BLOGGABLE_VOTE_THRESHOLD,
      downvotes: 0,
      is_bloggable: true
    )

    @post.update!(downvotes: 1)

    assert_not @post.reload.is_bloggable
  end

  def test_post_should_set_slug_on_create
    @post.save!
    assert_equal "getting-started-with-rails", @post.slug
  end

  def test_post_slug_is_parameterized_title
    title = @post.title
    @post.save!
    assert_equal title.parameterize, @post.slug
  end

  def test_should_generate_unique_slug_for_duplicate_titles
    @post.save!
    duplicate_post = Post.create!(
      title: "Getting started with Rails",
      description: "Another post with the same title.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )

    assert_equal "getting-started-with-rails-2", duplicate_post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_two_worded_titles
    first_post = Post.create!(
      title: "test post",
      description: "First description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    second_post = Post.create!(
      title: "test post",
      description: "Second description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_hyphenated_titles
    first_post = Post.create!(
      title: "test-post",
      description: "First description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    second_post = Post.create!(
      title: "test-post",
      description: "Second description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )

    assert_equal "test-post", first_post.slug
    assert_equal "test-post-2", second_post.slug
  end

  def test_slug_generation_for_posts_having_titles_one_being_prefix_of_the_other
    first_post = Post.create!(
      title: "fishing",
      description: "First description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    second_post = Post.create!(
      title: "fish",
      description: "Second description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )

    assert_equal "fishing", first_post.slug
    assert_equal "fish", second_post.slug
  end

  def test_should_not_allow_slug_to_be_updated
    @post.save!
    @post.slug = "updated-slug"

    assert_not @post.valid?
    assert_includes @post.errors[:slug], I18n.t("post.slug.immutable")
  end

  def test_error_raised_for_duplicate_slug
    another_post = Post.create!(
      title: "another test post",
      description: "Another description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )

    assert_raises ActiveRecord::RecordInvalid do
      another_post.update!(slug: @post.slug)
    end

    error_msg = another_post.errors.full_messages.to_sentence
    assert_match I18n.t("post.slug.immutable"), error_msg
  end

  def test_updating_title_does_not_update_slug
    @post.save!

    assert_no_changes -> { @post.reload.slug } do
      updated_post_title = "updated post title"
      @post.update!(title: updated_post_title)
      assert_equal updated_post_title, @post.title
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-post"
    first_post = Post.create!(
      title:, description: "First.", is_bloggable: true, user: @user, organization: @user.organization
    )
    second_post = Post.create!(
      title:, description: "Second.", is_bloggable: true, user: @user, organization: @user.organization
    )
    third_post = Post.create!(
      title:, description: "Third.", is_bloggable: true, user: @user, organization: @user.organization
    )
    fourth_post = Post.create!(
      title:, description: "Fourth.", is_bloggable: true, user: @user, organization: @user.organization
    )

    assert_equal "#{title.parameterize}-4", fourth_post.slug

    third_post.destroy

    expected_slug_suffix_for_new_post = fourth_post.slug.split("-").last.to_i + 1

    new_post = Post.create!(
      title:, description: "Fifth.", is_bloggable: true, user: @user, organization: @user.organization
    )
    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_post}", new_post.slug
  end

  def test_existing_slug_prefixed_in_new_post_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "buy milk and apple"
    new_title = "buy milk"

    existing_post = Post.create!(
      title: title_having_new_title_as_substring,
      description: "Existing description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    assert_equal title_having_new_title_as_substring.parameterize, existing_post.slug

    new_post = Post.create!(
      title: new_title,
      description: "New description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    title_having_new_title_as_ending_substring = "Go for grocery shopping and buy apples"
    new_title = "buy apples"

    existing_post = Post.create!(
      title: title_having_new_title_as_ending_substring,
      description: "Existing description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_post.slug

    new_post = Post.create!(
      title: new_title,
      description: "New description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "buy 2 apples"

    existing_post = Post.create!(
      title: title_with_numbered_substring,
      description: "Existing description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )
    assert_equal title_with_numbered_substring.parameterize, existing_post.slug

    substring_of_existing_slug = "buy"
    new_post = Post.create!(
      title: substring_of_existing_slug,
      description: "New description.",
      is_bloggable: true,
      user: @user,
      organization: @user.organization
    )

    assert_equal substring_of_existing_slug.parameterize, new_post.slug
  end

  def test_creates_multiple_posts_with_unique_slug
    posts = create_list(:post, 10, user: @user, organization: @user.organization)
    slugs = posts.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end
end
