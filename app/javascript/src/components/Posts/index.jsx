import routes from "constants/routes";

import React, { useState } from "react";

import AddCategoryModal from "components/Categories/AddModal";
import CategoriesSidebar from "components/Categories/Sidebar";
import { Container } from "components/commons";
import { useCreateCategory } from "hooks/reactQuery/useCategoriesApi";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import { keysToCamelCase } from "neetocist";
import { Button, NoData, Spinner, Typography } from "neetoui";
import { Link } from "react-router-dom";
import withTitle from "utils/withTitle";

import Card from "./Card";

const POSTS_LISTING_TITLE = "Blog posts";

const Posts = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { mutateAsync: createCategory } = useCreateCategory();
  const { data: posts, isLoading } = useFetchPosts({
    category_id: selectedCategoryId,
  });

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      return;
    }

    await createCategory({ name: newCategoryName.trim() });
    setNewCategoryName("");
    setIsCategoryModalOpen(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      );
    }

    if (!posts?.length) {
      return <NoData title="No blog posts yet" />;
    }

    const normalizedPosts = posts.map(keysToCamelCase);

    return (
      <div>
        {normalizedPosts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <Container
      isCategoriesOpen={isCategoriesOpen}
      leftSidebar={
        <CategoriesSidebar
          isOpen={isCategoriesOpen}
          selectedCategoryId={selectedCategoryId}
          onAddCategory={() => setIsCategoryModalOpen(true)}
          onSelectCategory={setSelectedCategoryId}
        />
      }
      onBookClick={() => setIsCategoriesOpen(false)}
      onCategoryClick={() => setIsCategoriesOpen(state => !state)}
    >
      <div className="mb-8 flex items-center justify-between gap-x-4">
        <Typography className="text-gray-900" style="h2" weight="semibold">
          {POSTS_LISTING_TITLE}
        </Typography>
        <Link to={routes.posts.create}>
          <Button label="Add new blog post" style="primary" />
        </Link>
      </div>
      {renderContent()}
      <AddCategoryModal
        categoryName={newCategoryName}
        isOpen={isCategoryModalOpen}
        onCancel={() => setIsCategoryModalOpen(false)}
        onChange={event => setNewCategoryName(event.target.value)}
        onSave={handleCreateCategory}
      />
    </Container>
  );
};

export default withTitle(Posts, POSTS_LISTING_TITLE);
