import {NAMES, DESCRIPTIONS, MESSAGES, usedID} from './data';

function randomInteger(min, max) {
  const res = min + Math.random() * (max - min + 1);
  return Math.floor(res);
}

function maxStringLength(str, maxLength) {
  return str.length <= maxLength;
}

const getNewID = (min, max) => {
  let tempID = randomInteger(min, max);

  while (usedID.includes(tempID)) {
    tempID = randomInteger(min, max);
  }
  usedID.push(tempID);

  return tempID;
};

const generateComments = (numberOfComments) => {
  const comments = [];

  for (let i = 0; i < numberOfComments; i++) {
    comments.push(
      {
        id: getNewID(0, 999),
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

  for (let i = 0; i < numberOfPosts; i++) {
    posts.push(
      {
        id: i,
        url: `photos/${i}.jpg`,
        description: DESCRIPTIONS[randomInteger(0, DESCRIPTIONS.length - 1)],
        likes: randomInteger(15, 200),
        comments: generateComments(5)
      }
    );
  }

  return posts;
};

export {randomInteger, maxStringLength, getNewID, generateComments, generatePosts};
