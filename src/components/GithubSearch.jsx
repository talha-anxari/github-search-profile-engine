import React, { useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  TwitterIcon,
  GithubIcon,
  Users,
  Book,
  Link2,
} from "lucide-react";

export default function GitHubProfileSearch() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError("User not found");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 p-3 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2 px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text leading-tight">
            GitHub Profile Search
          </h1>

          <p className="text-sm sm:text-base text-gray-400">
            Search and explore any GitHub user's profile
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 mx-2 sm:mx-0">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg pl-10 pr-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Enter GitHub username"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-yellow-300 to-orange-500 text-white font-medium hover:from-yellow-400 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-center text-red-400 mx-2 sm:mx-0 text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Profile Card */}
        {profile && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 mx-2 sm:mx-0">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image Section */}
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <div className="relative group">
                  <img
                    src={profile.avatar_url}
                    alt={profile.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl border-2 border-gray-800  transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl transition-opacity duration-300" />
                </div>
              </div>

              {/* Profile Info Section */}
              <div className="flex-1 space-y-4 sm:space-y-6">
                {/* Name and Join Date */}
                <div>
                  <div className="flex flex-col items-center md:items-start gap-2 mb-2">
                    <div className="text-center md:text-left">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-100">
                        {profile.name || "Name not available"}
                      </h2>
                      <a
                        href={profile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 transition-colors text-sm sm:text-base"
                      >
                        @{profile.login}
                      </a>
                    </div>
                    <span className="text-xs sm:text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                      Joined:{" "}
                      {new Date(profile.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {profile.bio && (
                    <p className="text-gray-400 mt-2 text-sm sm:text-base text-center md:text-left">
                      {profile.bio}
                    </p>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 text-center">
                    <Book className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2 mx-auto text-yellow-300" />
                    <div className="text-lg sm:text-xl font-bold text-gray-100">
                      {profile.public_repos}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Repositories
                    </div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 text-center">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2 mx-auto text-orange-500" />
                    <div className="text-lg sm:text-xl font-bold text-gray-100">
                      {profile.followers}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Followers
                    </div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 sm:p-4 text-center col-span-2 sm:col-span-1">
                    <Link2 className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2 mx-auto text-yellow-300" />
                    <div className="text-lg sm:text-xl font-bold text-gray-100">
                      {profile.following}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">
                      Following
                    </div>
                  </div>
                </div>

                {/* Location and Company */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm sm:text-base">
                  {profile.location && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" />
                      <span className="text-gray-400">{profile.location}</span>
                    </div>
                  )}
                  {profile.company && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                      <span className="text-gray-400">{profile.company}</span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm sm:text-base">
                  {profile.twitter_username && (
                    <a
                      href={`https://twitter.com/${profile.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-300 to-orange-500 text-white rounded-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-600 transition-colors"
                    >
                      <TwitterIcon className="h-4 w-4" />
                      Twitter Profile
                    </a>
                  )}
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-300 to-orange-500 text-white rounded-lg hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-600 transition-colors"
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

