const NAMES = [
  'Ли',
  'Клементина',
  'Кенни',
  'Криста',
  'Омид'
];

const DESCRIPTIONS = [
  'Здесь должна быть подпись.',
  'Это моя лучшая фотография, как считаете?',
  'С новой камерой снимать стало гораздо проще!',
  'Новый день - новый пост.',
  'Подпись к фотографии - это целое искусство.'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const usedID = [];

function randomInteger(min, max) {
  const res = min + Math.random() * (max - min + 1);
  return Math.floor(res);
}

function maxStringLength(str, maxLength) {
  return str.length <= maxLength;
}

const getNewID = () => {
  let tempID = randomInteger(0, 499);

  while(usedID.includes(tempID)) {
    tempID = randomInteger(0, 499);
  }
  usedID.push(tempID);

  return tempID;
};

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

generatePosts(25);

randomInteger(5, 15);
maxStringLength('qwerty', 7);
