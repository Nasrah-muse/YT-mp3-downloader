
document.querySelector('#search-form').addEventListener('submit', async function(event){
    event.preventDefault();

   
     const query = document.querySelector('#search-input').value;
    const url = `https://youtube-v3-alternative.p.rapidapi.com/search?query=${query}&type=video`;

    const options = {
        method : "GET",
        headers : {
            "x-rapidapi-key" : "46f2caceafmshd887ef4dfa8600cp18efddjsnb98e0c373744",
            'x-rapidapi-host': 'youtube-v3-alternative.p.rapidapi.com'

        }
    }

    try{
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data);

        displayVideo(result.data);
    }
    catch(error){
        console.error("Error fetching search results", error);
    }

});

//  display video
function displayVideo(videos){
    const videoList = document.querySelector('#video-list');

    videoList.innerHTML = "";

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = `
        <div class="video-thumbnail" style= "background-image: url('${video.thumbnail[0].url}'); width:320px; height:200px;"></div>

        <div class="video-info">
        <div class="video-title">${video.title}</div>
        <div class="video-channel">${video.channelTitle}</div>
        </div>
        `;
        videoList.appendChild(videoItem);

        videoItem.addEventListener("click",  ()=> openModal(video.videoId));
    });
}

function openModal(videoId){
    const modal = document.querySelector("#video-modal");
    const videoPlayer = document.querySelector('#video-player');
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
     videoPlayer.src = videoUrl;

    modal.style.display = 'block';


    //  Video download

 document.querySelector('#download-mp3').addEventListener("click", async function(){
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`; // Use the current videoId for download

    const options = {
        method : "GET",
        headers : {
            "x-rapidapi-key" :  '46f2caceafmshd887ef4dfa8600cp18efddjsnb98e0c373744',
            'x-rapidapi-host': 'youtube-mp36.p.rapidapi.com'
 
        }
    }

    try{
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(response);
        console.log(result);

         if(result.status === "ok"){
            window.location.href = result.link;
 
        }
        else{
            alert("Error Youtube downloading Mp3")
        }

     }
    catch(error){
        console.error("Error", error);
    }

    })

}

//  Two ways to clse modal
//  ways 1
document.querySelector('#close-modal').addEventListener('click', closeModel);

function closeModel(){
    const modal = document.querySelector("#video-modal");
    const videoPlayer = document.querySelector('#video-player');
    
    videoPlayer.src = "";
    modal.style.display = "none"
}

//  ways 2
window.onclick = function (event){
    const modal = document.querySelector("#video-modal");
    if(event.target == modal){
        closeModel();
    }
}