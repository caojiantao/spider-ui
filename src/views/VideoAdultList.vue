<style>
  .video-adult-content {
    margin-top: 50px;
  }

  .video-adult-content-item {
    margin-bottom: 10px;
  }

  .video-adult-content-item-thumb-wrapper {
     background-color: #ddd;
  }

  .video-adult-content-item-thumb {
    display: block;
    width: 100%;
  }
</style>

<template>
  <div class="video-adult">
    <van-field
      readonly
      clickable
      label="视频分类"
      :value="sourceCategory"
      placeholder="选择分类"
      @click="openPickerPopup"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        title="选择分类"
        :columns="columns"
        :loading="pickerLoading"
        value-key="text"
        @cancel="showPicker = false"
        @confirm="onPickerConfirm"
        @change="onPickerChange"
        ref="picker"
      />
    </van-popup>

    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="没有更多了"
      @load="onListLoad">
      <div class="video-adult-content">
        <div class="video-adult-content-item"
          v-for="item in videoList" :key="item.index"
          @click="playVideo(source, item)">
          <img class="video-adult-content-item-thumb" v-lazy="item.thumb">
          <span class="video-adult-content-item-title">{{item.name}}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>

export default {
  name: 'VideoAdultList',
  data () {
    return {
      sourceCategory: '',
      showPicker: true,
      source: {},
      category: {},
      page: 1,
      listLoading: false,
      listFinished: false,
      videoList: [],
      columns: [
        {
          defaultIndex: 0,
          values: [
            { text: 'adczma.com', value: 'adczma' },
            { text: 'n3t3.com', value: 'n3t3' }
          ]
        },
        {
          defaultIndex: 0,
          values: []
        }
      ],
      loadedCategoryMap: new Map(),
      pickerLoading: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.$refs.picker.onChange()
    })
  },
  methods: {
    openPickerPopup () {
      this.showPicker = true
    },
    onListLoad () {
      if (!this.source.value || !this.category.value) {
        return
      }
      this.$http.get(`/adult/${this.source.value}/getVideoList?category=${this.category.value}&page=${this.page}`)
        .then(data => {
          if (!data || data.length === 0) {
            this.listFinished = true
            return
          }
          ++this.page
          this.videoList = this.videoList.concat(data)
          this.listLoading = false
        })
    },
    onPickerConfirm (values) {
      this.showPicker = false
      this.videoList = []
      this.page = 1
      this.listFinished = false
      this.source = values[0]
      this.category = values[1]
      this.sourceCategory = this.source.text + ' - ' + this.category.text
      this.onListLoad()
    },
    onPickerChange (picker, values, index) {
      // 避免重复加载
      const item = values[0]
      if (index === 1 || this.loadedCategoryMap.has(item.value)) {
        picker.setColumnValues(1, this.loadedCategoryMap.get(item.value))
        return
      }
      this.pickerLoading = true
      this.$http.get(`/adult/${item.value}/getVideoCategoryList`)
        .then(data => {
          this.pickerLoading = false
          if (!data) {
            return
          }
          const categoryList = []
          data.forEach(item => {
            categoryList.push({
              text: item.name,
              value: item.link
            })
          })
          picker.setColumnValues(1, categoryList)
          this.loadedCategoryMap.set(item.value, categoryList)
        })
    },
    playVideo (source, item) {
      const url = `/#/video-adult-play?source=${this.source.value}&&link=${item.link}`
      window.open(url)
    }
  }
}
</script>

<style>
</style>
