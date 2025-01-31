import { useState, useEffect } from "react";
import useConfigs from "./Config";

const FetchUsers = () => {
  const [hasError, setErrors] = useState(false);
  const [videos, setVideos] = useState({});
  const configs = useConfigs();

  async function fetchData() {
    const res = await fetch(
      configs.videoFiles
    );
    res
      .json()
      .then(res => setVideos(res))
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return JSON.stringify(videos);
};

export default FetchUsers;
