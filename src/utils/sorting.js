import moment from 'moment';

export const sortByPrice = (reverted) => (art1, art2) => (!reverted
  ? Number(art1.price) - Number(art2.price) : Number(art2.price) - Number(art1.price));

const getLastMilliseconds = (strDate) => {
  const parsed = strDate.split('.');
  const last = parsed ? parsed[1] : '';
  const match = last.match(/(\d\d\d)(\d\d\d)Z/);
  if (match && match[2]) {
    return Number(match[2]);
  }
  return null;
};

export const sortByUpdated = (reverted) => (art1, art2) => {
  if (moment(art1.created).isAfter(moment(art2.created))) {
    return reverted ? 1 : -1;
  }
  if (moment(art1.created).isBefore(moment(art2.created))) {
    return reverted ? -1 : 1;
  }

  const art1Milliseconds = getLastMilliseconds(art1.created);
  const art2Milliseconds = getLastMilliseconds(art2.created);

  if (art1Milliseconds && art2Milliseconds) {
    return reverted ? art1Milliseconds - art2Milliseconds : art2Milliseconds - art1Milliseconds;
  }

  return 0;
};

export const sortBySize = (reverted) => (art1, art2) => {
  const size1 = Number(art1.width) * Number(art1.height) * Number(art1.depth);
  const size2 = Number(art2.width) * Number(art2.height) * Number(art2.depth);
  return !reverted ? size1 - size2 : size2 - size1;
};
