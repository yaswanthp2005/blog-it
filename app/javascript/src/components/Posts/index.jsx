import routes from "constants/routes";

import React from "react";

import AddCategoryModal from "components/Categories/AddModal";
import CategoriesSidebar from "components/Categories/Sidebar";
import { Container } from "components/commons";
import usePostsListing from "hooks/usePostsListing";
import { Button, NoData, Spinner, Typography } from "neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import withTitle from "utils/withTitle";

import Card from "./Card";

const Posts = () => {
  const { t } = useTranslation();
  const {
    handleBookClick,
    handleCreateCategory,
    isCategoriesOpen,
    isCategoryModalOpen,
    isLoading,
    newCategoryName,
    posts,
    selectedCategoryIds,
    setIsCategoriesOpen,
    setIsCategoryModalOpen,
    setNewCategoryName,
    setSelectedCategoryIds,
  } = usePostsListing();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      );
    }

    if (!posts?.length) {
      return <NoData title={t("posts.noBlogPostsYet")} />;
    }

    return (
      <div>
        {posts.map(post => (
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
          selectedCategoryIds={selectedCategoryIds}
          onAddCategory={() => setIsCategoryModalOpen(true)}
          onSelectCategories={setSelectedCategoryIds}
        />
      }
      onBookClick={handleBookClick}
      onCategoryClick={() => setIsCategoriesOpen(state => !state)}
    >
      <div className="mb-8 flex items-center justify-between gap-x-4">
        <Typography className="text-gray-900" style="h2" weight="semibold">
          {t("posts.listingTitle")}
        </Typography>
        <Link to={routes.posts.create}>
          <Button label={t("posts.addNewBlogPost")} style="primary" />
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

export default withTitle(Posts, "posts.listingTitle");
