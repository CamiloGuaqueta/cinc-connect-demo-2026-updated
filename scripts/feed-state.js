/* ============================================
   CINC Connect Demo — Feed State
   Persists user-created posts, likes, and comments
   in localStorage under cinc:demo:* namespace.
   ============================================ */

(function () {
  'use strict';

  const NS = 'cinc:demo:';
  const KEY_USER_POSTS = NS + 'userPosts';
  const KEY_LIKES = NS + 'likes';
  const KEY_COMMENTS = NS + 'comments';

  // ----- User-created posts -----
  function getUserPosts() {
    try { return JSON.parse(localStorage.getItem(KEY_USER_POSTS) || '[]'); }
    catch (_) { return []; }
  }
  function saveUserPosts(arr) {
    localStorage.setItem(KEY_USER_POSTS, JSON.stringify(arr));
  }
  function addUserPost(post) {
    const all = getUserPosts();
    all.unshift(post);
    saveUserPosts(all);
    return post;
  }
  function deleteUserPost(id) {
    const all = getUserPosts().filter((p) => p.id !== id);
    saveUserPosts(all);
  }

  // ----- Likes -----
  // Stored as { postId: { liked: bool, count: number } }
  function getLikes() {
    try { return JSON.parse(localStorage.getItem(KEY_LIKES) || '{}'); }
    catch (_) { return {}; }
  }
  function saveLikes(map) {
    localStorage.setItem(KEY_LIKES, JSON.stringify(map));
  }
  function toggleLike(postId, baseCount) {
    const map = getLikes();
    const cur = map[postId] || { liked: false, count: baseCount || 0 };
    if (cur.liked) {
      cur.liked = false;
      cur.count = Math.max(0, cur.count - 1);
    } else {
      cur.liked = true;
      cur.count = cur.count + 1;
    }
    map[postId] = cur;
    saveLikes(map);
    return cur;
  }
  function getLikeState(postId, baseCount) {
    const map = getLikes();
    return map[postId] || { liked: false, count: baseCount || 0 };
  }

  // ----- Comments -----
  // Stored as { postId: [ { id, author, body, createdAt } ] }
  function getComments(postId) {
    try {
      const all = JSON.parse(localStorage.getItem(KEY_COMMENTS) || '{}');
      return all[postId] || [];
    } catch (_) { return []; }
  }
  function addComment(postId, body, authorName) {
    if (!body || !body.trim()) return null;
    let all = {};
    try { all = JSON.parse(localStorage.getItem(KEY_COMMENTS) || '{}'); }
    catch (_) {}
    if (!all[postId]) all[postId] = [];
    const comment = {
      id: 'c-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      author: authorName || 'You',
      body: body.trim(),
      createdAt: Date.now()
    };
    all[postId].push(comment);
    localStorage.setItem(KEY_COMMENTS, JSON.stringify(all));
    return comment;
  }
  function getCommentCount(postId, baseCount) {
    return (baseCount || 0) + getComments(postId).length;
  }

  // ----- Helpers -----
  function newPostId() {
    return 'user-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  }

  function formatRelativeTime(ts) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + ' minute' + (mins === 1 ? '' : 's') + ' ago';
    const hours = Math.floor(mins / 60);
    if (hours < 24) return hours + ' hour' + (hours === 1 ? '' : 's') + ' ago';
    const days = Math.floor(hours / 24);
    return days + ' day' + (days === 1 ? '' : 's') + ' ago';
  }

  window.FeedState = {
    getUserPosts, addUserPost, deleteUserPost,
    getLikeState, toggleLike,
    getComments, addComment, getCommentCount,
    newPostId, formatRelativeTime
  };
})();
