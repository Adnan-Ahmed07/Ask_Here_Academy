import ReactPlayer from "react-player";


const VideoPlayer=({
  width = "100%",
  height = "100%",
  url,
  
})=> {
  return (
    <div>
       <ReactPlayer
        
        
        width={'100%'}
        height={'100%'}
        url={url}
      
      />
    </div>
  )
}

export default VideoPlayer;