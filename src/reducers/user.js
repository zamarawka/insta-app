const user = (state = { user: null }, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        user: action.user
      };

    case 'TOGGLE_LIKE':
      return {
        ...state,
        user: {
          ...state.user,
          feed: {
            ...state.user.feed,
            posts: state.user.feed.posts.map((post) => {
              if (post.id === action.postId) {
                return {
                  ...post,
                  feedback: {
                    ...post.feedback,
                    likes: action.isLiked ?
                      post.feedback.likes.filter((user) => user !== action.currentUserId) :
                      post.feedback.likes.concat(action.currentUserId)
                  }
                }
              }

              return post;
            })
          }
        }
      };

    case 'ADD_COMMENT':
      return {
        ...state,
        user: {
          ...state.user,
          feed: {
            ...state.user.feed,
            posts: state.user.feed.posts.map((post) => {
              if (post.id === action.postId) {
                return {
                  ...post,
                  feedback: {
                    ...post.feedback,
                    comments: post.feedback.comments.concat({
                      id: new Date() + ' ' + Math.random(),
                      commiter: action.currentUserId,
                      text: action.comment,
                      date: new Date(),
                      likes: 0
                    })
                  }
                }
              }
              return post;
            })
          }
        }
      };

    default:
      return state;
  }
}

export default user;