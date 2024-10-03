// app/components/PodcastCard.js

const PodcastCard = ({ podcast }) => {
  return (
    <div className="border rounded-lg p-4 m-2 shadow">
      <h2 className="text-xl font-bold">{podcast.title}</h2>
      <p>{podcast.description}</p>
      <p className="font-semibold">{podcast.categoryName}</p>
      <a href={podcast.link} target="_blank" rel="noopener noreferrer">
        Listen Now
      </a>
    </div>
  );
};

export default PodcastCard;
