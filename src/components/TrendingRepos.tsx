import React, { useState, useEffect } from "react";
import axios from "axios";
import RepoCard from "./RepoCard";
import type { Repo } from "./types";

const TrendingRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const reposPerPage = 30;

  const getDateTenDaysAgo = (): string => {
    const date = new Date();
    date.setDate(date.getDate() - 10);
    return date.toISOString().split("T")[0];
  };

  const dateTenDaysAgo = getDateTenDaysAgo(); // 2025-05-19 (since today is 2025-05-29)

  const fetchRepos = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=created:>${dateTenDaysAgo}&sort=stars&order=desc&page=${pageNum}&per_page=${reposPerPage}`
      );
      const items = response.data.items;
      if (items.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
        setRepos(items);
      }
    } catch (error) {
      console.error("Error fetching repos:", error);
      setError("Failed to fetch repositories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos(page);
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleTrendingClick = () => {
    setPage(1); // Reset to page 1
    fetchRepos(1); // Re-fetch trending repos
  };

  const handleSettingsClick = () => {
    console.log("Settings button clicked"); // Placeholder for settings functionality
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="title">Trending Repos</h1>
        {error && <p className="error">{error}</p>}
        {repos.length === 0 && !loading ? (
          <p className="no-repos">No repositories found.</p>
        ) : (
          <>
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
            {loading && <p className="loading">Loading...</p>}
          </>
        )}
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1 || loading}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-number">Page {page}</span>
          <button
            onClick={handleNextPage}
            disabled={!hasMore || loading}
            className="pagination-button"
          >
            Next
          </button>
        </div>
        {/* Sticky button container for Trending and Settings */}
        <div className="sticky-button-container">
          <button onClick={handleTrendingClick} className="trending-button" disabled={loading}>
            <span className="trending-icon">★</span> Trending
          </button>
          <button onClick={handleSettingsClick} className="settings-button">
            <span className="settings-icon">⚙️</span> Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingRepos;