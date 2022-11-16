import {NAMES, DESCRIPTIONS, MESSAGES} from './data.js';

const randomInteger = (min, max) => {
  const res = min + Math.random() * (max - min + 1);
  return Math.floor(res);
};

const maxStringLength = (str, maxLength) => str.length <= maxLength;

const getNewID = () => randomInteger(0, 10000000);

const generateComments = (numberOfComments) => {
  const comments = [];

  for (let i = 0; i < numberOfComments; i++) {
    comments.push(
      {
        id: getNewID(),
        avatar: `img/avatar-${randomInteger(1, 6)}.svg`,
        message: MESSAGES[randomInteger(0, MESSAGES.length - 1)],
        name: NAMES[randomInteger(0, NAMES.length - 1)]
      }
    );
  }

  return comments;
};

const generatePosts = (numberOfPosts) => {
  const posts = [];

  for (let i = 1; i <= numberOfPosts; i++) {
    posts.push(
      {
        id: getNewID(),
        url: `photos/${i}.jpg`,
        description: DESCRIPTIONS[randomInteger(0, DESCRIPTIONS.length - 1)],
        likes: randomInteger(15, 200),
        comments: generateComments(randomInteger(1, 25))
      }
    );
  }

  return posts;
};

export {randomInteger, maxStringLength, getNewID, generatePosts};
