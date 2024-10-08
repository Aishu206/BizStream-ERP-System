// project imports
import services from '../../utils/mockAdapter';

// third-party
import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

// mail conversation
let mails = [
  {
    id: '#2Mail_Phoebe',
    subject: chance.sentence({ words: 10 }),
    isRead: false,
    important: true,
    starred: false,
    time: sub(new Date(), { days: 0, hours: 1, minutes: 45 }),
    promotions: false,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-3.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
    },
    sender: {
      avatar: 'user-4.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.paragraph({ sentences: 1 }),
    },
    message: chance.paragraph(),
    attachments: [],
  },
  {
    id: '#1Mail_Phoebe',
    subject: chance.sentence({ words: 8 }),
    isRead: true,
    important: false,
    starred: true,
    time: sub(new Date(), { days: 0, hours: 5, minutes: 45 }),
    promotions: true,
    forums: true,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
    },
    sender: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf',
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2',
      },
      {
        id: '#3Attach',
        image: 'img-gal-3.png',
        title: 'granite_cheese.wav',
      },
    ],
  },
  {
    id: '#3Mail_Phoebe',
    subject: chance.sentence({ words: 5 }),
    isRead: true,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 1, hours: 1, minutes: 0 }),
    promotions: false,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-5.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
    },
    sender: {
      avatar: 'user-6.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [],
  },
  {
    id: '#4Mail_Phoebe',
    subject: chance.sentence({ words: 12 }),
    isRead: false,
    important: true,
    starred: false,
    time: sub(new Date(), { days: 2, hours: 8, minutes: 15 }),
    promotions: true,
    forums: false,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-7.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
    },
    sender: {
      avatar: 'user-8.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2',
      },
      {
        id: '#3Attach',
        image: 'img-gal-3.png',
        title: 'granite_cheese.wav',
      },
    ],
  },
  {
    id: '#5Mail_Phoebe',
    subject: chance.sentence({ words: 8 }),
    isRead: true,
    important: false,
    starred: true,
    time: sub(new Date(), { days: 6, hours: 12, minutes: 55 }),
    promotions: false,
    forums: true,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-9.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
    },
    sender: {
      avatar: 'user-10.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf',
      },
      {
        id: '#3Attach',
        image: 'img-gal-3.png',
        title: 'granite_cheese.wav',
      },
    ],
  },
  {
    id: '#6Mail_Phoebe',
    subject: chance.sentence({ words: 10 }),
    isRead: true,
    important: true,
    starred: true,
    time: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    promotions: false,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-11.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
    },
    sender: {
      avatar: 'user-12.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: chance.email({ domain: 'company.com' }),
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [],
  },
  {
    id: '#7Mail_Phoebe',
    subject: chance.sentence({ words: 3 }),
    isRead: true,
    important: false,
    starred: true,
    time: sub(new Date(), { days: 10, hours: 8, minutes: 5 }),
    promotions: false,
    forums: true,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com',
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf',
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2',
      },
    ],
  },
  {
    id: '#8Mail_Phoebe',
    subject: chance.sentence({ words: 6 }),
    isRead: false,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 12, hours: 12, minutes: 5 }),
    promotions: true,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-5.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com',
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [],
  },
  {
    id: '#9Mail_Phoebe',
    subject: chance.sentence({ words: 10 }),
    isRead: true,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 13, hours: 12, minutes: 45 }),
    promotions: false,
    forums: false,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com',
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf',
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2',
      },
    ],
  },
  {
    id: '#10Mail_Phoebe',
    subject: chance.sentence({ words: 5 }),
    isRead: true,
    important: true,
    starred: true,
    time: sub(new Date(), { days: 14, hours: 1, minutes: 5 }),
    promotions: true,
    forums: true,
    attach: true,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-6.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com',
    },
    sender: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf',
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2',
      },
    ],
  },
  {
    id: '#11Mail_Phoebe',
    subject: chance.sentence({ words: 7 }),
    isRead: true,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 14, hours: 11, minutes: 45 }),
    promotions: false,
    forums: false,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com',
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [
      {
        id: '#1Attach',
        image: 'img-gal-1.png',
        title: '1080p_table_denar.pdf',
      },
      {
        id: '#2Attach',
        image: 'img-gal-2.png',
        title: 'handmade.mp2',
      },
    ],
  },
  {
    id: '#12Mail_Phoebe',
    subject: chance.sentence({ words: 10 }),
    isRead: false,
    important: false,
    starred: false,
    time: sub(new Date(), { days: 15, hours: 12, minutes: 5 }),
    promotions: true,
    forums: true,
    attach: false,
    sent: chance.bool(),
    draft: chance.bool(),
    spam: false,
    trash: chance.bool(),
    profile: {
      avatar: 'user-2.png',
      name: chance.name({ nationality: 'en' }),
      email: 'guiseppe.thea@company.com',
      to: 'carmel.pamela@company.com',
    },
    sender: {
      avatar: 'user-1.png',
      name: chance.name({ nationality: 'en' }),
      email: chance.email({ domain: 'company.com' }),
      to: 'guiseppe.thea@company.com',
      about: chance.sentence({ words: 8 }),
    },
    message: chance.paragraph(),
    attachments: [],
  },
];

// filter functions
const getInboxMails = () => mails.filter((item) => !item.spam);
const getSentMails = () => mails.filter((item) => item.sent);
const getDraftMails = () => mails.filter((item) => item.draft);
const getSpamMails = () => mails.filter((item) => item.spam);
const getTrashMails = () => mails.filter((item) => item.trash);
const getStarredMails = () => mails.filter((item) => item.starred);
const getImportantMails = () => mails.filter((item) => item.important);
const getPromotionsMails = () => mails.filter((item) => item.promotions);
const getForumMails = () => mails.filter((item) => item.forums);

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/mails/list').reply(() => [
  200,
  {
    mails,
    unreadCount: {
      all: mails.filter((i) => !i.isRead).length,
      inbox: getInboxMails().filter((i) => !i.isRead).length,
      sent: getSentMails().filter((i) => !i.isRead).length,
      draft: getDraftMails().filter((i) => !i.isRead).length,
      spam: getSpamMails().filter((i) => !i.isRead).length,
      trash: getTrashMails().filter((i) => !i.isRead).length,
      starred: getStarredMails().filter((i) => !i.isRead).length,
      important: getImportantMails().filter((i) => !i.isRead).length,
      promotions: getPromotionsMails().filter((i) => !i.isRead).length,
      forums: getForumMails().filter((i) => !i.isRead).length,
    },
  },
]);

services.onPost('/api/mails/setRead').reply((config) => {
  try {
    const { id } = JSON.parse(config.data);
    const mailIndex = mails.findIndex((i) => i.id === id);
    mails[mailIndex] = { ...mails[mailIndex], isRead: true };
    mails = [...mails];
    return [200, []];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

services.onPost('/api/mails/setImportant').reply((config) => {
  try {
    const { id } = JSON.parse(config.data);
    const mailIndex = mails.findIndex((i) => i.id === id);
    mails[mailIndex] = {
      ...mails[mailIndex],
      important: !mails[mailIndex].important,
    };
    mails = [...mails];
    return [200, []];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

services.onPost('/api/mails/setStarred').reply((config) => {
  try {
    const { id } = JSON.parse(config.data);
    const mailIndex = mails.findIndex((i) => i.id === id);
    mails[mailIndex] = {
      ...mails[mailIndex],
      starred: !mails[mailIndex].starred,
    };
    mails = [...mails];
    return [200, []];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

services.onPost('/api/mails/filter').reply((config) => {
  try {
    const { filter } = JSON.parse(config.data);

    let result = [];
    switch (filter) {
      case 'inbox':
        result = getInboxMails();
        break;
      case 'sent':
        result = getSentMails();
        break;
      case 'draft':
        result = getDraftMails();
        break;
      case 'spam':
        result = getSpamMails();
        break;
      case 'trash':
        result = getTrashMails();
        break;
      case 'starred':
        result = getStarredMails();
        break;
      case 'important':
        result = getImportantMails();
        break;
      case 'promotions':
        result = getPromotionsMails();
        break;
      case 'forums':
        result = getForumMails();
        break;
      case 'all':
      default:
        result = mails;
        break;
    }

    return [200, result];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
