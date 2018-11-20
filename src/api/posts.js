const apiEndpoint = process.env.REACT_APP_API;
export const showPostsList = ({userId, perPage, page}) =>
  fetch(`${apiEndpoint}/users/${userId}/posts?perPage=${perPage}&page=${page}`)
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        throw new Error('Ошибка вывода постов');
    })
