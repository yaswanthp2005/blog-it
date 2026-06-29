# frozen_string_literal: true

class PostVotesController < ApplicationController
  before_action :load_post!

  def create
    authorize @post, :vote?
    VoteService.new(post: @post, user: current_user, vote_type: vote_params[:vote_type]).process

    render json: { post: post_vote_response(@post) }
  end

  private

    def vote_params
      params.require(:vote).permit(:vote_type)
    end

    def load_post!
      @post = policy_scope(Post).includes(:votes).find_by!(slug: params[:post_slug])
    end

    def post_vote_response(post)
      {
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        net_vote_count: post.net_vote_count,
        is_bloggable: post.is_bloggable,
        user_vote: post.user_vote_type(current_user)
      }
    end
end
