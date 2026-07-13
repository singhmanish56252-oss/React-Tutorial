function Card({username, btnText= "visit profile"}) {
  return (
    <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-xl">
      <img
        src="https://picsum.photos/400/600"
        alt="Card"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-2xl font-bold text-white">
          Delba
        </h2>

        <p className="mt-2 text-gray-200">
          This is a beautiful Tailwind CSS card with an image.
        </p>

        //<button className="mt-4 rounded-lg bg-white px-4 py-2 font-semibold text-black hover:bg-gray-200">
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Card;