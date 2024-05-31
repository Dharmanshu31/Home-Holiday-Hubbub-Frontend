<template>
  <v-btn icon="mdi-robot" @click="chatBot = !chatBot" color="red"></v-btn>
  <v-dialog v-model="chatBot" width="auto" persistent>
    <div class="tw-bg-white sm:tw-min-w-[500px] tw-max-h-[425px]">
      <div class="tw-m-2 tw-p-3 tw-flex tw-border-b tw-border-black">
        <v-icon
          icon="mdi-close"
          class="tw-cursor-pointer"
          @click="chatBot = !chatBot"
        ></v-icon>
        <p class="tw-text-center tw-text-xl tw-font-bold tw-w-[85%]">
          CHAT BOT
        </p>
        <v-btn @click="resetBot">reset</v-btn>
      </div>
      <div class="tw-overflow-y-scroll tw-h-[300px] tw-flex tw-flex-col">
        <div
          :class="(i + 2) % 2 === 0 ? 'coverRight' : 'coverLeft'"
          v-for="(msg, i) of allMessage"
        >
          <div :class="(i + 2) % 2 === 0 ? 'right' : 'left'">
            {{ msg }}
          </div>
        </div>
      </div>
      <v-text-field
        v-model="message"
        :disabled="allow"
        class="tw-cursor-pointer"
        placeholder="Write Hear"
        append-inner-icon="mdi-send"
        @click:append-inner="sendMessage()"
      ></v-text-field>
    </div>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import axios from "../store/axios.ts";

const chatBot = ref(false);
const allow = ref(false);
const message = ref();
const allMessage = ref([
  "We'd love to help you find the perfect Type place to visit! Tell Me Somthing About Place",
]);

const sendMessage = async () => {
  if (message.value === "") return;
  allMessage.value.push(message.value);
  const sendData = message.value;
  message.value = "";
  try {
    allow.value = true;
    const res = await axios.post("property/user/userSpecific", {
      userPrompt: sendData,
    });
    allMessage.value.push(res.data);
    allow.value = false;
  } catch (err) {
    allMessage.value.push("somthing wents wrong try again letter");
    allow.value = false;
  }
};

const resetBot = () => {
  allMessage.value = [
    "We'd love to help you find the perfect Type place to visit! Tell Me Somthing About Place",
  ];
};
</script>

<style scoped>
.right {
  background-color: #34343444;
  text-align: start;
  max-width: 300px;
  border-radius: 15px;
  padding: 10px;
  position: relative;
  margin: 5px;
  border-bottom-left-radius: 0%;
}

.left {
  background-color: teal;
  text-align: end;
  max-width: 300px;
  border-radius: 15px;
  padding: 10px;
  position: relative;
  margin: 5px;
  border-bottom-right-radius: 0%;
}

.coverRight {
  display: flex;
  justify-content: start;
}

.coverLeft {
  display: flex;
  justify-content: end;
}
</style>
