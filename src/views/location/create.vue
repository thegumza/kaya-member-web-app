<template>
  <place-detail :is-edit="false" />
</template>

<script>
import PlaceDetail from './components/PlaceDetail'

export default {
  name: 'CreatePlace',
  components: { PlaceDetail }
}
</script>

