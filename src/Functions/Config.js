import { useState } from 'react';

const useConfigs = () => {
  const [config] = useState({
        videoFiles:"https://api.antares.ninja/videoFiles",
        mkvVideos:"https://api.antares.ninja/mkv-videos",
        musicFiles:"https://api.antares.ninja/musicFiles",
        videos:"https://api.antares.ninja/videos",
        music:"https://api.antares.ninja/music",
        book:"https://api.antares.ninja/vbook/book/",
        cover:"https://api.antares.ninja/vbook/cover/",
        fullName:"https://api.antares.ninja/vbook/fullName/",
        style:"https://api.antares.ninja/vbook/style/",
        bookList: "https://api.antares.ninja/vbook/bookList"
  });

  return config;
};

export default useConfigs;