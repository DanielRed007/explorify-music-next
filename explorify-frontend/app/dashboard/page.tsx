import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((err) => {
          setError("Failed to fetch user profile");
          console.error(err);
        });
    }
  }, []);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className='p-4'>
      <h1 className='text-2xl'>Welcome, {profile.display_name}</h1>
      <p className='text-sm'>Email: {profile.email}</p>
    </div>
  );
};

export default Dashboard;
