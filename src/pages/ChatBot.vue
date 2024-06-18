<template>
  <v-btn icon="mdi-robot" @click="chatBot = !chatBot" color="red"></v-btn>
  <v-dialog v-model="chatBot" width="auto" persistent>
    <div class="tw-bg-white sm:tw-min-w-[450px] tw-min-h-[445px]">
      <div
        class="tw-m-2 tw-p-3 tw-flex tw-border-b tw-border-black tw-items-center"
      >
        <v-icon
          icon="mdi-close"
          class="tw-cursor-pointer"
          @click="chatBot = !chatBot"
        ></v-icon>
        <p class="tw-text-center tw-text-xl tw-font-bold tw-w-[85%]">
          CHAT BOT
        </p>
        <v-btn @click="resetBot" icon="mdi-refresh" variant="text"></v-btn>
      </div>
      <div
        id="message-container"
        class="tw-overflow-y-scroll tw-scroll-smooth tw-h-[350px] tw-flex tw-flex-col"
      >
        <Loader class="tw-mt-24" v-if="loading" />
        <div
          :class="(i + 2) % 2 === 0 ? 'coverRight' : 'coverLeft'"
          v-for="(msg, i) of allMessage"
          v-if="!loading"
        >
          <div :class="(i + 2) % 2 === 0 ? 'right' : 'left'" v-if="!loading">
            <div v-html="msg"></div>
          </div>
        </div>
      </div>
      <v-textarea
        v-model="message"
        :disabled="allow"
        class="tw-cursor-pointer"
        placeholder="Write Here"
        append-inner-icon="mdi-send"
        @click:append-inner="sendMessage()"
        @keyup.enter.exact="sendMessage()"
        auto-grow
        rows="1"
        max-rows="5"
      ></v-textarea>
    </div>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "../store/axios.ts";

const chatBot = ref(false);
const allow = ref(false);
const loading = ref(false);
const message = ref();
const resetToken = ref(false);
const allMessage = ref([
  "We'd love to help you find the perfect Type place to visit! Tell Me About City You Are Visting",
]);

const latestScroll = () => {
  const messageContain = document.getElementById("message-container");
  if (messageContain) {
    messageContain.scrollTop = messageContain.scrollHeight;
  } else return messageContain;
};

const formatResponse = (response) => {
  if (
    !response.includes("Best Places to Visit:") &&
    !response.includes("YouTube Links:")
  ) {
    return response;
  }

  let formattedResponse = "";
  const lines = response.split("\n").filter((line) => line.trim() !== "");

  let inBestPlaces = false;
  let inYouTubeLinks = false;

  lines.forEach((line) => {
    if (
      line.includes("**Best Places to Visit:**") ||
      line.includes("Best Places to Visit:")
    ) {
      if (inYouTubeLinks) {
        formattedResponse += "</ul>";
        inYouTubeLinks = false;
      }
      formattedResponse += `<h3>${line}</h3><ul>`;
      inBestPlaces = true;
    } else if (
      line.includes("**YouTube Links:**") ||
      line.includes("YouTube Links:")
    ) {
      if (inBestPlaces) {
        formattedResponse += "</ul>";
        inBestPlaces = false;
      }
      formattedResponse += `<h3>${line}</h3><ul>`;
      inYouTubeLinks = true;
    } else if (line.startsWith("   - ")) {
      if (inBestPlaces) {
        formattedResponse += `<li>${line.substring(5)}</li>`;
      } else if (inYouTubeLinks) {
        const linkText = line.match(/\[(.*?)\]/)?.[1];
        const url = line.match(/\((.*?)\)/)?.[1];
        if (linkText && url) {
          formattedResponse += `<li><a href="${url}" target="_blank" style="color: blue;">${linkText}</a></li>`;
        }
      }
    }
  });

  if (inBestPlaces || inYouTubeLinks) {
    formattedResponse += "</ul>";
  }

  return formattedResponse;
};

const sendMessage = async () => {
  if (message.value === "") return;
  allMessage.value.push(message.value);
  setTimeout(() => {
    latestScroll();
  }, 10);

  const sendData = message.value;
  message.value = "";
  try {
    allow.value = true;
    const res = await axios.post("property/user/userSpecific", {
      userPrompt: sendData,
    });
    if (resetToken.value) {
      return;
    }
    if (res && res.data) {
      const formating = formatResponse(res.data);
      allMessage.value.push(formating);
      allow.value = false;
      setTimeout(() => {
        latestScroll();
      }, 10);
    }
  } catch (err) {
    allMessage.value.push("somthing wents wrong try again letter");
    allow.value = false;
    setTimeout(() => {
      latestScroll();
    }, 10);
  }
};

const resetBot = async () => {
  allow.value = true;
  loading.value = true;
  try {
    await axios.post("property/user/userSpecific", {
      userPrompt: "reset",
    });
    allMessage.value = [
      "We'd love to help you find the perfect Type place to visit! Tell Me About City You Are Visting",
    ];
    resetToken.value = true;
    allow.value = false;
    loading.value = false;
  } catch (err) {
    resetToken.value = true;
    allow.value = false;
    loading.value = false;
  }
};
</script>

<style scoped>
.right {
  background-color: #34343444;
  text-align: start;
  max-width: 400px;
  min-height: 20px;
  border-radius: 15px;
  padding: 10px;
  position: relative;
  margin: 5px;
  border-bottom-left-radius: 0%;
  word-break: break-word;
  overflow-wrap: break-word;
}

.left {
  background-color: teal;
  text-align: end;
  max-width: 300px;
  min-height: 50px;
  border-radius: 15px;
  padding: 10px;
  position: relative;
  margin: 5px;
  border-bottom-right-radius: 0%;
  word-break: break-word;
  overflow-wrap: break-word;
}

.coverRight {
  display: flex;
  justify-content: start;
}

.coverLeft {
  display: flex;
  justify-content: end;
}

:deep(.v-input__details) {
  display: none;
}
</style>
