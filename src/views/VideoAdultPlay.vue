<style scoped>
  video {
    width: 100%;
  }
</style>

<template>
  <div>
    <video ref="video" controls playsinline webkit-playsinline :poster="videoInfo.thumb"></video>

    <van-cell-group>
      <van-field
        readonly
        :value="videoInfo.name"
        label="名称"
      />
      <van-field
        readonly
        is-link
        :value="videoInfo.link"
        label="源地址"
        @click="toLink"
      />
    </van-cell-group>
  </div>
</template>

<script>

export default {
  data () {
    return {
      videoInfo: {}
    }
  },
  mounted: function () {
    const source = this.$route.query.source
    const link = this.$route.query.link
    this.$http.get(`/adult/${source}/getVideoInfo?link=${link}`).then(info => {
      const video = this.$refs.video
      this.videoInfo = info
      // eslint-disable-next-line no-undef
      if (Hls.isSupported()) {
      // eslint-disable-next-line no-undef
        const hls = new Hls()
        hls.loadSource(info.playUrl)
        hls.attachMedia(video)
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = info.playUrl
      }
    })
  },
  methods: {
    toLink () {
      window.open(this.videoInfo.link)
    }
  }
}
</script>
