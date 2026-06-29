# frozen_string_literal: true

class PostFilterService
  attr_reader :posts, :params

  def initialize(posts, params:)
    @posts = posts
    @params = params
  end

  def process
    @posts = filter_by_title
    @posts = filter_by_category
    @posts = filter_by_status

    posts
  end

  private

    def filter_by_title
      title = params[:title].to_s.strip
      return posts if title.blank?

      posts.where("LOWER(title) LIKE ?", "%#{Post.sanitize_sql_like(title.downcase)}%")
    end

    def filter_by_category
      category_ids = Array(params[:category_ids]).compact_blank
      return posts if category_ids.blank?

      matching_post_ids = PostCategory.where(category_id: category_ids).select(:post_id)
      posts.where(id: matching_post_ids)
    end

    def filter_by_status
      status = params[:status].presence
      return posts if status.blank?

      posts.where(status:)
    end
end
