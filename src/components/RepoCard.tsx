import React from "react";
import type { Repo } from "./types";

interface RepoCardProps {
  repo: Repo;
}

const RepoCard = ({ repo }: RepoCardProps) => (
  <div className="repo-card">
    <div className="repo-details">
      {/* 1. Repository name */}
      <h3 className="repo-name">{repo.name}</h3>
      {/* 2. Repository description */}
      <p className="repo-description">
        {repo.description || "No description available"}
      </p>
      <div className="repo-meta">
        {/* 4. Username and avatar of the owner (avatar part) */}
        <img
          src={repo.owner.avatar_url}
          alt={`${repo.owner.login} avatar`}
          className="avatar"
        />
        {/* 3. Numbers of stars for the repo */}
        <div className="stars">
          <span className="star">★</span>
          <span className="star-count">
            {(repo.stargazers_count / 1000).toFixed(1)}k
          </span>
        </div>
        <span className="separator">•</span>
        {/* 4. Username and avatar of the owner (username part) */}
        <span className="owner">{repo.owner.login}</span>
      </div>
    </div>
  </div>
);

export default RepoCard;