<script setup>
const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  isStriped: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <table class="table">
    <tr>
      <th v-for="header in props.headers"
        class="table-header"
        :class="{ 'hidden': header.isHidden,  }"
        :style="{
          width: header?.width ? header.width + 'px' : 'auto',
          maxWidth: header?.width ? header.maxWidth + 'px' : 'auto',
          'text-align': header.align }"
        :key="header"
      >
        {{ header.value }}
      </th>
    </tr>
    <tr v-for="(row, rowIndex) in props.rows" class="row" :key="rowIndex">
      <td v-for="(cell, cellIndex) in row"
        :class="{ 'hidden': cell.isHidden,
          'cell--bold': cell.isBold,
          'row--striped': rowIndex%2 === 1 && props.isStriped}"
        :style="{ 'width': cell.width ? cell.width + 'px' : 'auto', 'text-align': cell.align }"
        :key="cellIndex">
        <div v-if="cell.isFlagCell" class="flag-cell" :class="{ 'flag--left': !cell.isFlagRight }">
          <span>{{ cell.value }}</span> <span :style="{ order: cell.isFlagRight ? 1 : -4}">
            <img class="flag" :src="cell.flagUrl" alt="flag">
          </span>
        </div>
        <span v-else>{{ cell.value }}</span>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.flag-cell {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
}
.flag--left {
  justify-content: flex-start;
}
.hidden {
  display: none;
}
.table {
  color: #4B5C68;
  width: 100%;
  border-collapse: collapse;
  border-color: #E4EDF2;
}
.table-header {
  font-size: 12px;
  height: 40px;
  background-color: #E4EDF2;
  border-color: #E4EDF2;
}
.row {
  height: 70px;
  border-top: 1px solid #E4EDF2;
  font-size: 14px;
}
.cell--bold {
  font-size: 16px;
  font-weight: bold;
}
.row--striped {
  background-color: #F6F7F7;
}
.flag {
  width: 53px;
  height: 37px;
}
</style>