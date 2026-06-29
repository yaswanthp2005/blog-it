import React from "react";

import classNames from "classnames";
import { useVotePost } from "hooks/reactQuery/usePostsApi";
import { Down, Up } from "neetoicons";
import { Typography } from "neetoui";
import PropTypes from "prop-types";

import { VOTE_TYPES } from "./constants";

const VoteControls = ({ netVoteCount = 0, slug, userVote = null }) => {
  const { isLoading, mutate: votePost } = useVotePost();

  const handleVote = voteType => {
    if (isLoading) {
      return;
    }

    votePost({ slug, voteType });
  };

  const isUpvoted = userVote === VOTE_TYPES.UPVOTE;
  const isDownvoted = userVote === VOTE_TYPES.DOWNVOTE;

  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <button
        aria-label="Upvote"
        type="button"
        className={classNames(
          "rounded p-1 transition-colors hover:bg-gray-100",
          {
            "text-green-600": isUpvoted,
            "text-gray-400": !isUpvoted,
          }
        )}
        onClick={() => handleVote(VOTE_TYPES.UPVOTE)}
      >
        <Up size={20} />
      </button>
      <Typography
        className="min-w-[2rem] text-center text-gray-900"
        style="body2"
        weight="semibold"
      >
        {netVoteCount}
      </Typography>
      <button
        aria-label="Downvote"
        type="button"
        className={classNames(
          "rounded p-1 transition-colors hover:bg-gray-100",
          {
            "text-red-500": isDownvoted,
            "text-gray-400": !isDownvoted,
          }
        )}
        onClick={() => handleVote(VOTE_TYPES.DOWNVOTE)}
      >
        <Down size={20} />
      </button>
    </div>
  );
};

VoteControls.propTypes = {
  netVoteCount: PropTypes.number,
  slug: PropTypes.string.isRequired,
  userVote: PropTypes.oneOf([VOTE_TYPES.UPVOTE, VOTE_TYPES.DOWNVOTE, null]),
};

export default VoteControls;
