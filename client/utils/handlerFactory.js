import { client } from '../lib/sanity';

// Day Left
export const getDayLeft = (endDate) => {
  const today = new Date();
  const endDay = new Date(endDate);

  const difference = today.getHours() - endDay.getHours();

  if (difference === 0) return false;
  if (difference < 0) return 'bid finished';
  return `${difference.toString().slice(1)} day${difference > 1 && 's'} `;
};

export const countdownMidnight = () => {
  const day = new Date();
  const hours = 24 - day.getHours();
  const min = 60 - day.getMinutes();
  const sec = 60 - day.getSeconds();

  // add 0 if min or sec < 10
  const customTime = (params) => {
    if (params < 10) {
      return (params = `0${params}`);
    } else {
      return params;
    }
  };

  return `${hours}:${customTime(min)}:${customTime(sec)}`;
};

// Handle onClick image's input
export const clickHandler = (hiddenFileInput) => hiddenFileInput.current.click();
// Display image uploaded
export const uploadHandler = (e, setNFTImage) => e.target.files[0] && setNFTImage(e.target.files);

export const uploadCollectionHandler = (e, setNFTImage, setNFTPropertie) => {
  const files = e.target.files;
  setNFTImage(e.target.files);

  const items = [];
  if (files) {
    for (let i = 0; i < files.length; i++) {
      items.push({ name: `nft#${i}` });
    }

    setNFTPropertie(items);
  }
};

// Reset image's input
export const resetUpload = (setNFTImage) => setNFTImage(null);
// Handler modal
export const handleModal = (e, setIsModalOpen, isModalOpen) => {
  !isModalOpen && e.preventDefault();
  setIsModalOpen(!isModalOpen);
};

// Handler open and close select form
export const openHandler = (e, setOpen, open) => {
  e.preventDefault();
  e.stopPropagation();
  setOpen(!open);
};

//
export const handlerClickOutSide = (open, setOpen, target) => {
  if (open) {
    window.addEventListener('click', (e) => {
      if (e.target !== document.querySelector(target)) {
        setOpen(false);
      }
    });
    return () => {
      window.removeEventListener('click', setOpen(false));
    };
  }
};

export const convertDate = (date) => {
  const initialDate = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(initialDate);
  const year = initialDate.getFullYear();

  return { month, year };
};

export const viewsPage = async (documentId) => {
  await client.patch(`${documentId}`).inc({ view: 1 }).commit();
};

export const createUserAndCollectionSanity = async (addressFromWallet) => {
  const allUsers = await client.fetch(`*[_type == 'users']`);
  // Already created or not
  let bool = false;

  const doc = {
    _type: 'users',
    address: addressFromWallet,
    username: `Otaku #${allUsers.length < 10 ? `0${allUsers.length + 1}` : allUsers.length + 1}`,
  };

  allUsers.map(async (user) => {
    if (user.address === addressFromWallet) {
      return (bool = true);
    }
  });

  // If no yet create a collection
  if (!bool) {
    client.create(doc).then(async (doc) => {
      const mint = await mintNFTCollection(
        'Default',
        'DFT',
        'bafybeihyfa5kjobgqvtnzwew2g2qnyabx3t3g6qst2q75eufmvwbsjy62e',
        1
      );

      const collection = {
        _type: 'collection',
        name: 'Default',
        cymbol: 'DFT',
        creator: {
          _type: 'reference',
          _ref: doc._id,
        },
        address: mint.token,
        cid: 'bafybeihyfa5kjobgqvtnzwew2g2qnyabx3t3g6qst2q75eufmvwbsjy62e',
      };
      client.create(collection);
    });
  }
};
