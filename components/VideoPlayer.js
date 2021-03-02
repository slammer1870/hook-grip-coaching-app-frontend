const VideoPlayer = ({ video }) => {
    return (
        <div>
            <iframe
                src="https://player.vimeo.com/video/415861269"
                width="640"
                height="360"
                className="inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen></iframe>
        </div>
    );
};

export default VideoPlayer;
