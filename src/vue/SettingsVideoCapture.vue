<template>
    <div v-if="choosedStream === undefined">
        <div>Выберете окно для захвата</div>
        <video
            v-for="(stream, index) in streams"
            :key="index"
            :ref="el => { if (el) streamVideos[index] = el }"
            :srcObject="stream"
            :class="[$style.streamVideo]"
            @click.capture="onStreamVideoClick(stream)"
        />
    </div>
    <div v-else>
        <div>
            <video
                ref="choosedStreamVideo"
                :srcObject="choosedStream"
                :class="[$style.video]"
            />
            <button
                v-if="isRecordRunning === false"
                :class="[$style.button, $style.start]"
                @click="startRecord"
            >
                Начать запись
            </button>
            <button
                v-else
                :class="[$style.button, $style.stop]"
                @click="stopRecord"
            >
                Остановить запись
            </button>
        </div>
        <div :class="$style.videoContainer">
            <div
                v-for="(src, index) in videoRecordingSrcs"
                :key="index"
                :class="$style.videoRecordingWrapper"
            >
                <video
                    :class="$style.videoRecording"
                    :src="src"
                    controls
                />
                <button
                    :class="$style.deleteButton"
                    @click="deleteVideoSrc(index)"
                >
                    delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import getSourceForCapturePromise from '../components/getSourceForCapturePromise.js';
import { ref, watch, nextTick, onBeforeUpdate } from 'vue';

const sourceForCapturePromise = getSourceForCapturePromise()
    .then((sources) => sources.filter((source) => source.name === 'view' || source.name === 'settings'));

export default {
    setup () {
        onBeforeUpdate(() => {
            streamVideos.value = [];
        });

        const streamVideos = ref(null);
        const choosedStreamVideo = ref(null);

        const isRecordRunning = ref(false);
        const streams = ref([]);
        const choosedStream = ref(undefined);
        const mediaRecorder = ref(undefined);
        const videoRecordingSrcs = ref([]);

        let chunks = [];

        sourceForCapturePromise.then((sources) => {
            const streamsPromise = sources.map((source) => {
                const userMediaPromise = navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: source.id,
                        },
                    },
                });
                return userMediaPromise;
            });
            return Promise.all(streamsPromise);
        }).then((streamsPromise) => {
            streams.value = streamsPromise;
        });

        watch(() => streams, (value) => {
            nextTick(() => {
                streamVideos.value.forEach((video) => video.play());
            });
        }, { deep: true });
        watch(() => choosedStream, () => {
            nextTick(() => {
                choosedStreamVideo.value.play();
                mediaRecorder.value.ondataavailable = function (event) {
                    chunks.push(event.data);
                };
                mediaRecorder.value.addEventListener('stop', (event) => {
                    const blob = new Blob(chunks);
                    chunks = [];
                    const url = window.URL.createObjectURL(blob);
                    videoRecordingSrcs.value.push(url);
                });
            });
        }, { deep: true });

        return {
            streamVideos,
            streams,
            isRecordRunning,
            choosedStream,
            choosedStreamVideo,
            videoRecordingSrcs,
            onStreamVideoClick (stream) {
                choosedStream.value = stream;
                mediaRecorder.value = new MediaRecorder(stream);
            },
            startRecord () {
                isRecordRunning.value = true;
                mediaRecorder.value.start();
            },
            stopRecord () {
                isRecordRunning.value = false;
                mediaRecorder.value.stop();
            },
            deleteVideoSrc (index) {
                videoRecordingSrcs.value.splice(index, 1);
            },
        };
    },
};
</script>

<style module>
.video {
    max-width: 10vw;
}
.streamVideo {
    max-width: 30vw;
    cursor: pointer;
}
.videoRecording {
    max-width: 28vw;
}
.videoContainer {
    display: flex;
    flex-wrap: wrap;
}
.videoRecordingWrapper {
    outline: 1px solid;
}
.deleteButton {
    padding: 0.5vw;
    cursor: pointer;
    font-size: 1vw;
}
.button {
    padding: 1vw;
    color: #fff;
    cursor: pointer;
    font-size: 2vw;
}
.start {
    background-color: #f0c817;
}
.stop {
    background-color: #f0506e;
}
</style>
