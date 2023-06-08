let songs = [
    {
      name: "Hoa Cỏ Lau",
      singer: "Phong Max | H2K Cover",
      audio: "./assets/audio/audio-1.mp3",
      img: "./assets/img/img-1.avif",
    },
    {
      name: "Cứ ngỡ",
      singer: "NB3 Hoài Bảo - Hoàng Ly",
      audio: "./assets/audio/audio-2.mp3",
      img: "./assets/img/img-2.avif",
    },
    {
      name: "Xa mãi",
      singer: "H2K & Jin Tuấn Nam",
      audio: "./assets/audio/audio-3.mp3",
      img: "./assets/img/img-3.avif",
    },
    {
      name: "Ai khóc cho em",
      singer: "Huyền Zoe x Tvk x H2O",
      audio: "./assets/audio/audio-4.mp3",
      img: "./assets/img/img-4.avif",
    },
    {
      name: "Cuối cùng thì",
      singer: "Jack",
      audio: "./assets/audio/audio-5.mp3",
      img: "./assets/img/img-5.avif",
    },
    {
      name: "Chạnh lòng thương cô 4",
      singer: "Huy Vạc X WM",
      audio: "./assets/audio/audio-6.mp3",
      img: "./assets/img/img-6.avif",
    },
    {
      name: "Gió",
      singer: "Jank x N2L",
      audio: "./assets/audio/audio-7.mp3",
      img: "./assets/img/img-7.avif",
    },
    {
      name: "Sao em lại tắt máy?",
      singer: "Phạm Nguyên Ngọc ft. VAnh (Original)",
      audio: "./assets/audio/audio-8.mp3",
      img: "./assets/img/img-8.avif",
    },
  ];
  
  let $ = document.querySelector.bind(document);
  let $$ = document.querySelectorAll.bind(document);
  
  function renderSongs(songs) {
    let listSongBlock = $(".list-song");
    let htmls = songs.map((song, i) => {
      return `
      <div class="list-song__item">
        <img src="${song.img}" alt="" class="song-item__img">
        <div class="song-item__content">
          <p class="song-item__content--name">${song.name}</p>
          <p class="song-item__content--singer">${song.singer}</p>
        </div>
        <audio src="${song.audio}" controls hidden></audio>
        <i class="fa-solid fa-ellipsis ellipsis"></i>
      </div>
      `;
    });
    listSongBlock.innerHTML = htmls.join("");
    let listSongItem = $$(".list-song__item");
    let audios = $$("audio");
    handelNextBackSong(listSongItem);
    defaultSong(songs, listSongItem);
    handleRandomSong(listSongItem);
    handelClickListItem(songs, listSongItem, audios);
    handleRepeatSong(listSongItem, audios);
  }
  
  // XỬ LÍ PHẦN CONTROLS SONG
  function handelClickListItem(songs, listSongItem) {
    listSongItem.forEach((songItem, i) => {
      songItem.addEventListener("click", function () {
        // XỬ LÍ PHẦN THÊM XOÁ CLASS CHO LISTSONGITEM
        $(".list-song__item.adBackground").classList.remove("adBackground");
        this.classList.add("adBackground");
  
        let pauseBlock = $(".pause-block");
        let playBlock = $(".play-block");
        let audios = $$("audio");
  
        // THÊM PHẦN LẶP LẠI BÀI HÁT KHI ẤN NÚT REPEAT
        // let repeatSong = $(".repeat-song");
        // repeatSong.style.color = "#7b77af";
        // repeatSong.onclick = function () {
        //   if (repeatSong.style.color === "rgb(123, 119, 175)") {
        //     repeatSong.style.color = "#ef276a";
        //     audios[i].setAttribute("loop", "");
        //   } else {
        //     repeatSong.style.color = "#7b77af";
        //     audios[i].removeAttribute("loop");
        //   }
        // };
  
        // XỬ LÍ PHẦN QUAY CỦA ẢNH
        let imgSongBlock = $(".img-song");
        imgSongBlock.classList.add("rotate");
        imgSongBlock.style.animationPlayState = "running";
        // restart lại hiệu ứng xoay
        imgSongBlock.style.animation = "none";
        imgSongBlock.offsetHeight;
        imgSongBlock.style.animation = null;
  
        // THAY ĐỔI ẢNH CỦA BÀI HÁT VÀ PHẦN TÊN CỦA TỪNG PHÀN TỬ
        let headerNameSong = $(".header__name-song");
        headerNameSong.textContent = songs[i].name;
        let imgSong = $(".img-song img");
        imgSong.src = songs[i].img;
  
        // reset lại bài hát khi ấn vào bài nhạc khac
        audios[i].play();
        for (let j = 0; j < audios.length; j++) {
          if (audios[i] !== audios[j]) {
            audios[j].load();
            audios[j].pause();
          }
        }
  
        // dừng animation khi bài nhạc kết thúc
        audios[i].onended = function () {
          imgSongBlock.style.animationPlayState = "paused";
          playBlock.style.display = "flex";
          pauseBlock.style.display = "none";
          if (i >= listSongItem.length - 1) {
            listSongItem[0].click();
          } else {
            listSongItem[i + 1].click();
          }
        };
  
        // THAY ĐỔI GIỮA HAI NÚT PLAY VÀ NÚT PAUSE
        playBlock.style.display = "none";
        pauseBlock.style.display = "flex";
        pauseBlock.classList.add("controls__around-icon--special");
  
        // XỬ LÍ PHẦN SLIDER
        let slider = $(".slider");
        audios[i].ontimeupdate = function () {
          let percent = (audios[i].currentTime / audios[i].duration) * 100;
          slider.value = percent;
        };
        slider.oninput = function (e) {
          audios[i].currentTime = (e.target.value / 100) * audios[i].duration;
        };
  
        // chạy bài hát
        playBlock.onclick = function () {
          audios[i].play();
          playBlock.style.display = "none";
          pauseBlock.style.display = "flex";
          pauseBlock.classList.add("controls__around-icon--special");
          if (imgSongBlock.classList.contains("rotate")) {
            imgSongBlock.style.animationPlayState = "running";
          }
        };
  
        // dùng bài hát
        pauseBlock.onclick = function () {
          audios[i].pause();
          pauseBlock.style.display = "none";
          pauseBlock.classList.remove("controls__around-icon--special");
          playBlock.style.display = "flex";
          imgSongBlock.style.animationPlayState = "paused";
        };
        // }
      });
    });
  }
  
  // XỬ LÍ PHẦN NHÁY KHI NHẤN VÀO CÁC NÚT PHẦN CONTROLS
  function controlsBtn() {
    let controlsBtns = $$(".controls-btn");
    controlsBtns.forEach((itemBtn) => {
      itemBtn.onmousedown = function () {
        itemBtn.style.background = "#ddd";
      };
      itemBtn.onmouseup = function () {
        itemBtn.style.background = "transparent";
      };
    });
  }
  
  // XỬ LÍ PHẦN LẶP LẠI BÀI HÁT
  function handleRepeatSong(listSongItem, audios) {
    let repeatBlock = $(".repeat-song__block");
    let repeatBtn = $(".repeat-song");
    repeatBtn.style.color = "#7b77af";
    repeatBlock.onclick = function () {
      listSongItem.forEach((songItem, i) => {
        if (songItem.classList.contains("adBackground")) {
          if (repeatBtn.style.color === "rgb(123, 119, 175)") {
            repeatBtn.style.color = "#ef276a";
            audios[i].setAttribute("loop", "");
          } else {
            repeatBtn.style.color = "#7b77af";
            audios[i].removeAttribute("loop");
          }
        }
      });
    };
  }
  
  // XỬ LÍ KHI BÀI HÁT KẾT THÚC THÌ CHẠY BÀI TIẾP THEO
  // function handleSongEnded(listSongItem, audios) {
  //   listSongItem.forEach((songItem, i) => {
  //     if (songItem.classList.contains("adBackground")) {
  //       console.log(audios[i], i)
  //       audios[i].onended = function () {
  //         if( i >= listSongItem.length- 1) {
  //           listSongItem[0].click()
  //         }
  //         else {
  //           listSongItem[i + 1].click()
  //         }
  //       }
  //     }
  //   });
  // }
  
  // XỬ LÍ PHẦN CHẠY RANDOM BÀI HAT
  function handleRandomSong(listSongItem) {
    let randomSongBlock = $(".random-song__block");
    let randomBtn = $(".random-song");
    let listSongItemsLength = listSongItem.length;
    randomSongBlock.onclick = function () {
      randomBtn.classList.toggle("active");
      if (randomBtn.classList.contains("active")) {
      }
    };
  }
  
  // XỬ LÍ PHẦN TIẾN VÀ LÙI BÀI HÁT
  function handelNextBackSong(listSongItem) {
    listSongItem[0].classList.add("adBackground");
    let backSongbtn = $(".back-song__block");
    let randomBtn = $(".random-song");
    backSongbtn.onclick = function () {
      if (randomBtn.classList.contains("active")) {
        for (let i = 0; i < listSongItem.length; i++) {
          if (listSongItem[i].classList.contains("adBackground")) {
            let newIndex;
            do {
              newIndex = Math.floor(Math.random() * listSongItem.length);
            } while (i === newIndex);
            listSongItem[newIndex].click();
          }
        }
      } else {
        for (let i = 0; i < listSongItem.length; i++) {
          if (listSongItem[i].classList.contains("adBackground")) {
            if (i === 0) {
              listSongItem[listSongItem.length - 1].click();
              console.log(
                listSongItem.length,
                listSongItem[listSongItem.length - 1]
              );
            } else {
              listSongItem[i - 1].click();
              break;
            }
          }
        }
      }
    };
  
    let nextSongbtn = $(".next-song__block");
    nextSongbtn.onclick = function () {
      if (randomBtn.classList.contains("active")) {
        for (let i = 0; i < listSongItem.length; i++) {
          if (listSongItem[i].classList.contains("adBackground")) {
            let newIndex;
            do {
              newIndex = Math.floor(Math.random() * listSongItem.length);
            } while (i === newIndex);
            listSongItem[newIndex].click();
          }
        }
      } else {
        for (let i = 0; i < listSongItem.length; i++) {
          if (listSongItem[i].classList.contains("adBackground")) {
            if (i === listSongItem.length - 1) {
              listSongItem[0].click();
            } else {
              listSongItem[i + 1].click();
              break;
            }
          }
        }
      }
    };
  }
  
  // xử lí phần kéo giao diện và làm biến mất phàn ảnh bài hát
  function scrollToTop() {
    let imgSong = $(".img-song img");
    let imgWidth = imgSong.offsetWidth;
    window.onscroll = function () {
      let scrollPx = document.documentElement.scrollTop || window.scrollY;
      let newImgWidth = imgWidth - scrollPx;
      imgSong.style.width = newImgWidth > 0 ? newImgWidth + "px" : 0;
      imgSong.style.height = newImgWidth > 0 ? newImgWidth + "px" : 0;
      imgSong.style.opacity = newImgWidth / imgWidth;
    };
  }
  
  function defaultSong(songs, listSongItem) {
    let playBlock = $(".play-block");
    playBlock.onclick = function () {
      listSongItem[0].click();
    };
  }
  
  function start() {
    renderSongs(songs);
    scrollToTop();
    controlsBtn();
  }
  
  start();
  