(function () {
    console.log("[YTJ] Start");

    // すでにパネルが存在すれば二重表示はしない
    if (document.getElementById("ytj-panel")) {
        console.log("[YTJ] すでにUIが存在しています。");
        return;
    }

    function getVideo() {
        const v = document.querySelector("video.html5-main-video");
        console.log("[YTJ] video: ", v);
        return v;
    }

    function parseToSecond(text) {
        console.log("[YTJ] parseToSecond 入力: ", text)

        text = text.trim();
        if (!text) {
            return null;
        }

        const parts = text.split(":");
        console.log("[YTJ] parts: ", parts);

        if (parts.length === 1) {
            const sec = Number(parts[0]);

            if (Number.isNaN(sec)) {
                return null;
            }            
            return sec;
        } else if (parts.length === 2) {
            const min = Number(parts[0]);
            const sec = Number(parts[1]);

            if (Number.isNaN(min) || Number.isNaN(sec)) {
                return null;
            }
            return min * 60 + sec;
        } else if (parts.length === 3) {
            const hour = Number(parts[0]);
            const min  = Number(parts[1]);
            const sec  = Number(parts[2]);

            if (Number.isNaN(hour) || Number.isNaN(min) || Number.isNaN(sec)) {
                return null;
            }
            return hour * 3600 + min * 60 + sec;
        } else {
            return null;
        }
    }

    // パネルの生成
    const panel = document.createElement("div");
    panel.id = "ytj-panel"
    panel.style.position = "fixed";
    panel.style.bottom = "20px";
    panel.style.right = "20px";
    panel.style.zIndex = "999999";
    panel.style.background = "rgba(0,0,0,0.8)";
    panel.style.color = "#fff";
    panel.style.padding = "8px";
    panel.style.borderRadius = "6px";
    panel.style.fontSize = "12px";
    panel.style.display = "flex";
    panel.style.gap = "4px";
    panel.style.alignItems = "center";

    const label = document.createElement("span");
    label.textContent = "Junp time（hh:mm:ss / mm:ss / ss）";

    const input = document.createElement("input");
    input.type = "text";
    input.style.width = "70px";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Go"
    button.style.cursor = "pointer";

    button.addEventListener("click", () => {
        const video = getVideo();
        if (!video) {
            alert("Error: Not found video.");
            return;
        }

        const sec = parseToSecond(input.value);
        if (sec == null) {
            alert("Error: Invalid input time.");
            return;
        }

        if (!Number.isNaN(video.duration) && sec > video.duration) {
            video.currentTime = video.duration;
        } else {
            video.currentTime = sec;
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            button.click();
        }
    });

    panel.appendChild(label);
    panel.appendChild(input);
    panel.appendChild(button);

    document.body.appendChild(panel);
})();