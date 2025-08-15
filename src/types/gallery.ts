export interface IGalleryData {
  _id: string;
  title: string;
  description: string;
  postDateTime: {
    postDate: string;
    postTime: string;
  };
  activity: boolean;
}
