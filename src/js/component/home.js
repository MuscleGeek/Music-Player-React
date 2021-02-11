import React from "react";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.audio = null;
		this.state = {
			currentIndex: 1,
			songs: [
				{
					title: "South Park",
					id: "south-park",
					author: "Kyle",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/south-park.mp3"
				},
				{
					title: "Thunder Cats",
					id: "thundercats",
					author: "Moonra",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/thundercats.mp3"
				},
				{
					title: "X-Men",
					id: "x-men",
					author: "Profesor",
					url:
						"https://assets.breatheco.de/apis/sound/files/cartoons/songs/x-men.mp3"
				}
			]
		};
	}
	//montamos el componente y agregamos las canciones//
	componentDidMount() {
		this.pauseButton.style.display = "none";
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json()) //la respuesta la pasa a formato .json
			.then(songs => this.setState({ songs })); //da el estado del response json
	}

	changeTrack(i) {
		this.setState({ currentIndex: i }); //le damos el estado actual de la cancion
		this.audio.current.pause(); //pausa la cancion
		this.audio.current.load(); //carga la cancion
		this.audio.current.play(); //reproducir la cancion
	}
	play = i => {
		let url = this.state.songs[i].url; //ve el estado de la cancion dentro del json
		const songUrl = "https://assets.breatheco.de/apis/sound/" + url; //ejecuta la locacion de la cancion
		this.audio.src = songUrl; //donde la cancion esta almacenada
		this.audio.play(); //da play
		this.playButton.style.display = "none"; //oculat el play button
		this.pauseButton.style.display = "inline-block"; //se va mostar en modo bloque en horizontal
		this.setState({ currentIndex: i });
	};

	pause = () => {
		this.audio.pause(); //cuando pause
		this.playButton.style.display = "inline-block"; //el boton se muestra en forma horizontal
		this.pauseButton.style.display = "none"; //se oculta cuando se esta en play
	};

	render() {
		const liList = this.state.songs.map((song, index) => {
			return (
				<li
					key={index}
					onClick={() => this.play(this.state.currentIndex)}>
					<span>{index + 1 + " "}</span>
					<span>{song.name}</span>
				</li>
			);
		});

		const audioPlayer = (
			<>
				<div className="audioPlayer">
					<button
						onClick={() => this.play(this.state.currentIndex - 1)}>
						<i className="fa fa-caret-left" aria-hidden="true" />
					</button>
					<button
						ref={element => (this.playButton = element)}
						onClick={() => this.play(this.state.currentIndex)}>
						<i className="fa fa-play" aria-hidden="true" />
					</button>
					<button
						ref={element => (this.pauseButton = element)}
						onClick={() => this.pause(this.state.currentIndex)}>
						<i className="fa fa-pause" aria-hidden="true" />
					</button>
					<button
						onClick={() => this.play(this.state.currentIndex + 1)}>
						<i className="fa fa-caret-right" aria-hidden="true" />
					</button>
				</div>
				<audio ref={element => (this.audio = element)} />
			</>
		);

		return (
			<>
				<div className="audioBox ml-3">
					<div className="audiorow col-2">{audioPlayer}</div>
					<div className="playlist col-2">{liList}</div>
				</div>
			</>
		);
	}
}
