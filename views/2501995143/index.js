'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);
  const router = useRouter();
  
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data.slice(0, 20)); 
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    
    return () => abortController.abort();
  }, []);

  const memoizedFilteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, posts]);
  
  useEffect(() => {
    setFilteredPosts(memoizedFilteredPosts);
  }, [memoizedFilteredPosts]);

  const handlePostClick = (id) => {
    router.push(`/2501995143/details?id=${id}`);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
      Error: {error}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to My Bootcamp Project
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore posts fetched from JSONPlaceholder API with full React hooks implementation
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
          I am studying Computer Science at Bina Nusantara University. I'm passionate about developing games, building scalable web applications and learning modern frameworks like React.
        </p>
      </div>

      <div className="relative max-w-xl mx-auto">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 px-4 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        />
        <div className="absolute left-4 top-3.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.472l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map(post => (
          <div 
            key={post.id} 
            onClick={() => handlePostClick(post.id)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
          >
            <div className="p-5">
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  Post #{post.id}
                </span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  {post.userId}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mt-3 line-clamp-1">
                {post.title}
              </h3>
              <p className="text-gray-600 mt-2 line-clamp-3">
                {post.body}
              </p>
              <div className="mt-4 flex items-center text-sm text-indigo-600 font-medium">
                View Details →
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9.172 16.172a4 4 0 005.656 0M9.172 16.172a4 4 0 01-5.656 0m5.656 0a4 4 0 10-5.656-5.656m0 0a4 4 0 11-5.656-5.656m5.656 0a4 4 0 105.656-5.656" />
          </svg>
          <p className="mt-4 text-gray-600">No posts found matching your search</p>
        </div>
      )}
    </div>
  );
}