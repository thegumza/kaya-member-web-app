<template>
  <place-detail :is-edit="true" />
</template>

<script>
import PlaceDetail from './components/PlaceDetail'

export default {
  name: 'EditForm',
  components: { PlaceDetail }
}
</script>

