export type Chat = {
  id: string;
  name: string;
  profilePicture: string;
  lastMessage: string;
  isRead: boolean;
  professionalDetails: string;
  isBookmarked?: boolean;
};

export const chat: Chat[] = [
  {
    id: "1",
    name: "Hridyansh Sahu",
    profilePicture: "/public/assets/image2.jpeg",
    lastMessage: "Hello! i am Founding Member of SuperDM",
    isRead: false,
    professionalDetails: "Founding Member SuperDM",
  },
  {
    id: "2",
    name: "Shikhar Saxena",
    profilePicture: "/public/assets/image1.jpeg",
    lastMessage: "How are you?",
    isRead: true,
    professionalDetails: "Founder at SuperDM",
  },

  {
    id: "3",
    name: "Likhith Reddy",
    profilePicture: "/public/assets/panther.jpeg",
    lastMessage: "i am a black panther",
    isRead: false,
    professionalDetails: "Developer",
  },

  {
    id: "4",
    name: "Ayush Kumar",
    profilePicture: "/public/assets/spiderman.jpeg",
    lastMessage: "Busy",
    isRead: false,
    professionalDetails: "Actor",
  },

  {
    id: "5",
    name: "Devesh Tiwari",
    profilePicture: "/public/assets/superman.jpg",
    lastMessage: "I am a Doggy",
    isRead: true,
    professionalDetails: "Dog",
  },
];
